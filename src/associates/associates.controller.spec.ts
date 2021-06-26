import { Test, TestingModule } from '@nestjs/testing';
import { AssociatesController } from './associates.controller';

describe('AssociatesController', () => {
  let controller: AssociatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociatesController],
    }).compile();

    controller = module.get<AssociatesController>(AssociatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
