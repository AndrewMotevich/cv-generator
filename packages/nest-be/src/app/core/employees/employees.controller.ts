import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeesService } from './employees.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('EMPLOYEES')
@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}
  @Get()
  getEmployees() {
    return this.employeesService.getEmployees();
  }

  @UsePipes(new ValidationPipe())
  @Post('')
  async createEmployee(@Body() dto: EmployeeDto) {
    const res = await this.employeesService.addEmployee(dto).catch((error) => {
      throw new BadRequestException(error);
    });
    return res;
  }

  @UsePipes(new ValidationPipe())
  @Delete('/:id')
  async deleteEmployee(@Param('id', new ParseIntPipe()) id: number) {
    const res = await this.employeesService
      .deleteEmployee(id)
      .catch((error) => {
        throw new BadRequestException(error);
      });
    return res;
  }
}
