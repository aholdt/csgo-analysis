import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AzureADGuard } from "../auth/azure-ad.guard";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat } from "./entities/cat.entity";

@UseGuards(AzureADGuard)
@ApiTags("cats")
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: "Create cat" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: Cat,
  })
  findOne(@Param("id") id: string): Cat {
    return this.catsService.findOne(+id);
  }
}
