import { Associate } from './../interfaces/associates';
import { DbQueryBuilder } from './../dbQueryBuilder/dbQueryInitiator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssociatesService {
  private dbQueryBuilder: DbQueryBuilder;
  constructor() {
    this.dbQueryBuilder = new DbQueryBuilder();
  }

  async saveAssociate(requestData: Associate) {
    try {
      const doesUserExist = await this.doesNameExist(
        requestData.associate_name,
      );
      if (!doesUserExist.isValid) {
        return { ...doesUserExist }
      }

      const saveAssociate = await this.dbQueryBuilder.QueryExecuter(
        `INSERT INTO associates.associates_master (associate_name,phone,address_val) VALUES($1,$2,$3) RETURNING *;`,
        [
          requestData.associate_name,
          requestData.phone,
          requestData.address_val,
        ],
      );

      const saveSpecializationToBridgeTable = await Promise.all(
        requestData.specialization.map(async (data) => {
          return await this.dbQueryBuilder.QueryExecuter(
            `INSERT INTO associates.associates_br_spec (associate_id,specialization_id) VALUES($1,$2) RETURNING *;`,
            [saveAssociate[0].associate_id, data.specialization_id],
          );
        }),
      );

      return {
        message: 'Associate saved successfully',
        associate: saveAssociate[0],
        associate_spec_Bridge: saveSpecializationToBridgeTable,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async fetchAssociate() {
    try {
      const associates = await this.dbQueryBuilder.QueryExecuter(
        `SELECT * FROM associates.associates_br_spec LEFT JOIN associates.associates_master ON associates.associates_br_spec.associate_id = 
        associates.associates_master.associate_id LEFT JOIN associates.specialization_master ON associates.associates_br_spec.specialization_id = 
        associates.specialization_master.specialization_id WHERE associates.associates_master.is_active=${true} ;`,
        [],
      );

      const groupedData = [];
      for (const data of associates) {
        const doesExist = groupedData.findIndex(
          (dataResult) => data.associate_id === dataResult.associate_id,
        );
        if (doesExist === -1) {
          groupedData.push({
            associate_id: data.associate_id,
            associate_name: data.associate_name,
            specialization: [
              {
                specialization_name: data.specialization_name,
                specialization_id: data.specialization_id,
              },
            ],
          });
        } else {
          groupedData[doesExist].specialization.push({
            specialization_name: data.specialization_name,
            specialization_id: data.specialization_id,
          });
        }
      }

      return groupedData;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteAssociate(requestBody: { id: string }) {
    try {
      await this.dbQueryBuilder.QueryExecuter(
        `UPDATE associates.associates_master SET is_active=${false} WHERE associate_id=$1;`,
        [Number(requestBody.id)],
      );
      return { message: 'Associate deleted successfully' };
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateAssociate(requestData: Associate) {
    try {
      const doesUserExist = await this.doesNameExist(
        requestData.associate_name,
      );
      if (!doesUserExist.isValid) {
        return { ...doesUserExist };
      }
      await this.dbQueryBuilder.QueryExecuter(
        `UPDATE associates.associates_master SET associate_name=$1,phone=$2,address_val=$3 WHERE associate_id=$4;`,
        [
          requestData.associate_name,
          requestData.phone,
          requestData.address_val,
          Number(requestData.associate_id),
        ],
      );

      // delete existing bridge data of the associate
      await this.dbQueryBuilder.QueryExecuter(
        `DELETE FROM associates.associates_br_spec WHERE associate_id=$1`,
        [Number(requestData.associate_id)],
      );

      //saveSpecializationToBridgeTable
      await Promise.all(
        requestData.specialization.map(async (data) => {
          return await this.dbQueryBuilder.QueryExecuter(
            `INSERT INTO associates.associates_br_spec (associate_id,specialization_id) VALUES($1,$2) RETURNING *;`,
            [Number(requestData.associate_id), data.specialization_id],
          );
        }),
      );

      return {
        message: 'Associate updated successfully',
      };
    } catch (e) {
      throw new Error(e);
    }
  }
  async doesNameExist(name: string) {
    try {
      const doesUserExist = await this.dbQueryBuilder.QueryExecuter(
        `SELECT associate_name FROM associates.associates_master WHERE associate_name=$1;`,
        [name],
      );
      if (doesUserExist.length) {
        return {
          status: 403,
          message: 'Associate already exist',
          isValid: false,
        };
      } else {
        return { isValid: true };
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
