import { Injectable } from "@nestjs/common";

@Injectable()
export class AgenciesService {
  private readonly agencies: Partial<AgencyDto>[] = [];
  private readonly STRING_BASE = 36;

  public selectAll(): AgencyDto[] {
    return this.agencies;
  }

  public findById(id: string): Partial<AgencyDto> {
    return this.agencies.find((agency) => agency.id === id);
  }

  public insert(agency: CreateAgencyDto): AgencyDto {
    const newAgency = {
      id: this.createGUID(),
      ...agency,
    };
    this.agencies.push(newAgency);
    return newAgency;
  }

  private createGUID(): string {
    const timeStamp = Date.now();
    const head = timeStamp.toString(this.STRING_BASE);
    const random = Math.random();
    const decimalPosition = 2;
    const tail = random.toString(this.STRING_BASE).substring(decimalPosition);
    return head + tail;
  }
}
