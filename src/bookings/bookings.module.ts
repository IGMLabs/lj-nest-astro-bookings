import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Trip } from '../trips/entities/trip.entity';
import { CoreModule } from '../core/core.module';

@Module({
  imports:[TypeOrmModule.forFeature([Booking,Trip]),CoreModule],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
