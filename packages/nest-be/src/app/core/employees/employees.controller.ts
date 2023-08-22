import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeesService } from './employees.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Public } from '../../auth/auth.guard';

@Public()
@ApiBearerAuth()
@ApiTags('EMPLOYEES')
@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @ApiOperation({ summary: 'Get employees' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @Get()
  getEmployees() {
    return this.employeesService.getEmployees();
  }

  @ApiOperation({ summary: 'Get employee by id' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @Get('/:id')
  getDataById(@Param('id', new ParseIntPipe()) id: number) {
    return this.employeesService.getEmployeeById(id);
  }

  @ApiOperation({ summary: 'Add new employee' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @UsePipes(new ValidationPipe())
  @Post('')
  async createEmployee(@Body() dto: EmployeeDto) {
    const res = await this.employeesService.addEmployee(dto).catch((error) => {
      throw new BadRequestException(error);
    });
    return res;
  }

  @ApiOperation({ summary: 'Update employee by id' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @Put('/:id')
  async updateProject(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: EmployeeDto
  ) {
    const res = await this.employeesService.updateEmployee(id, dto);
    return res;
  }

  @ApiOperation({ summary: 'Delete employee by id' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
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
