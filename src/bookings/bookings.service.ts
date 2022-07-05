import { Injectable, Logger } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { UtilsService } from '../core/utils/utils.service';
import { Repository, EntityNotFoundError, Connection } from 'typeorm';
import { Trip } from '../trips/entities/trip.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookingsService {
  private logger = new Logger("BookingsService");

  constructor(
    private utilService: UtilsService,
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @InjectRepository(Trip) private tripRepository: Repository<Trip>,
    private connection: Connection
  ) { }

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    const booking: Booking = this.bookingRepository.create(createBookingDto);
    try {
      await queryRunner.startTransaction();
      const trip: Trip = await this.tripRepository.findOneBy({ id: createBookingDto.tripId })
      this.bookTripPlaces(trip, createBookingDto, booking);
      await this.tripRepository.save(trip);
      await this.bookingRepository.save(booking);
      await queryRunner.commitTransaction();
    } catch (dbError) {
      await queryRunner.rollbackTransaction();
      this.logger.error(dbError);
      throw dbError;
    } finally {
      await queryRunner.release();
    }
    return booking;
  }

  private bookTripPlaces(trip: Trip, createBookingDto: CreateBookingDto, booking: Booking) {
    if (!trip)
      throw new EntityNotFoundError(Trip, createBookingDto.tripId);
    if (trip.places < createBookingDto.passengers)
      throw new Error("BUSSINES: Not enought places");
    trip.places -= createBookingDto.passengers;
    booking.id = this.utilService.createGUID();
    booking.trip = trip;
  }

  findAll() {
    return `This action returns all bookings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
