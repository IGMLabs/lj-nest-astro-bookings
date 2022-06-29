import { Injectable } from "@nestjs/common";
import { AgencyDto } from "./dto/agency.dto";
import { Agency } from "./dto/agency.interface";
import { UtilsService } from '../core/utils/utils.service';

@Injectable()
export class AgenciesService {
  private readonly agencies: Agency[] = [];

  constructor(private utilsService : UtilsService){}

  public selectAll(): Agency[] {
    return this.agencies;
  }

  public findById(id: string): Agency {
    const agency: Agency = this.agencies.find((agency) => agency.id === id);
    if (!agency) {
      throw new Error(`No existe ninguna agencia con ese id`);
    }
    return agency;
  }

  public insert(agency: AgencyDto): Agency {
    const newAgency = {
      id: this.utilsService.createGUID(),
      ...agency,
    };
    this.agencies.push(newAgency);
    return newAgency;
  }

  public update(agencyId: string, updateAgency: Agency): Agency {
    try {
      const agency = this.findById(agencyId);
      agency.name= updateAgency.name;
      return agency;
    }catch(error){
      throw new Error(`No existe la agencia que esta tratando de modificar`);
    }
  }

}
