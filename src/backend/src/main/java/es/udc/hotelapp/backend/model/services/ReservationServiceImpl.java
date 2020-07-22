package es.udc.hotelapp.backend.model.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.hotelapp.backend.model.entities.Guest;
import es.udc.hotelapp.backend.model.entities.GuestDao;
import es.udc.hotelapp.backend.model.entities.GuestReservation;
import es.udc.hotelapp.backend.model.entities.GuestReservationDao;
import es.udc.hotelapp.backend.model.entities.HotelDao;
import es.udc.hotelapp.backend.model.entities.Reservation;
import es.udc.hotelapp.backend.model.entities.ReservationDao;
import es.udc.hotelapp.backend.model.entities.Room;
import es.udc.hotelapp.backend.model.entities.RoomDao;
import es.udc.hotelapp.backend.model.entities.RoomReservation;
import es.udc.hotelapp.backend.model.entities.RoomReservationDao;
import es.udc.hotelapp.backend.model.entities.RoomTypeDao;
import es.udc.hotelapp.backend.model.entities.RoomTypeReservation;
import es.udc.hotelapp.backend.model.entities.RoomTypeReservationDao;
import es.udc.hotelapp.backend.model.entities.Status;
import es.udc.hotelapp.backend.model.exceptions.IncorrectHotelException;
import es.udc.hotelapp.backend.model.exceptions.IncorrectReservationException;
import es.udc.hotelapp.backend.model.exceptions.InstanceNotFoundException;

@Service
@Transactional
public class ReservationServiceImpl implements ReservationService {
	@Autowired
	ReservationDao reservationDao;
	@Autowired
	RoomTypeDao typeDao;
	@Autowired
	RoomTypeReservationDao roomtypereservationDao;
	@Autowired
	HotelDao hotelDao;
	@Autowired
	RoomDao roomDao;
	@Autowired
	RoomReservationDao roomreservationDao;
	@Autowired
	GuestReservationDao guestReservationDao;
	@Autowired
	GuestDao guestDao;

	@Override
	public Long addReservation(RoomTypeReservation rt1) throws InstanceNotFoundException {
		if (!typeDao.existsByName(rt1.getRoomtype().getName())) {
			throw new InstanceNotFoundException("project.entities.roomtype", rt1.getRoomtype().getId());
		}
		if (!hotelDao.existsByName(rt1.getHotel().getName())) {
			throw new InstanceNotFoundException("project.entities.hotel", rt1.getHotel().getId());
		}
		reservationDao.save(rt1.getReservation());
		roomtypereservationDao.save(rt1);
		return rt1.getId();
	}

	@Override
	public List<RoomTypeReservation> findReservations(String username) {
		List<RoomTypeReservation> result = new ArrayList<>();
		Iterable<RoomTypeReservation> reservations = roomtypereservationDao.findAll();
		for (RoomTypeReservation r : reservations) {
			if (r.getReservation().getUser().getFirstName() == username) {
				result.add(r);
			}
		}
		return result;
	}

	@Override
	public void updateReservation(RoomTypeReservation rt2) throws IncorrectHotelException {
		Optional<RoomTypeReservation> roomtypereservationfound = roomtypereservationDao.findById(rt2.getId());
		if (roomtypereservationfound.isPresent()) {
			if (roomtypereservationfound.get().getHotel() != rt2.getHotel()) {
				throw new IncorrectHotelException();
			}
			RoomTypeReservation actual = roomtypereservationfound.get();
			if (typeDao.existsByName(rt2.getRoomtype().getName())) {
				actual.setRoomtype(rt2.getRoomtype());
			}
			actual.setRooms(rt2.getRooms());
			Optional<Reservation> reservation = reservationDao.findById(rt2.getReservation().getId());
			if (reservation.isPresent()) {
				if (reservation.get().getUser() == rt2.getReservation().getUser()) {
					Reservation actualreservation = reservation.get();
					actualreservation.setInbound(rt2.getReservation().getInbound());
					actualreservation.setOutbound(rt2.getReservation().getOutbound());
					reservationDao.save(actualreservation);
					actual.setReservation(actualreservation);
				}
			}
			roomtypereservationDao.save(actual);
		}

	}

	@Override
	public Long assignReservation(RoomReservation rr1) throws InstanceNotFoundException {
		if (!roomDao.existsByNumber(rr1.getRoom().getNumber())
				|| (!reservationDao.existsById(rr1.getReservation().getId()))) {
			throw new InstanceNotFoundException("project.entities.roomreservation", rr1.getId());
		}
		Optional<Room> rfound = roomDao.findByNumber(rr1.getRoom().getNumber());
		Optional<Reservation> reservation = reservationDao.findById(rr1.getReservation().getId());

		rfound.get().setStatus(Status.OCUPADA);
		roomDao.save(rfound.get());

		if (reservation.get().getUser() == rr1.getReservation().getUser()) {
			roomreservationDao.save(rr1);
		}

		return rr1.getId();
	}

	@Override
	public RoomTypeReservation findById(Long id) throws InstanceNotFoundException {
		Optional<RoomTypeReservation> reservation = roomtypereservationDao.findById(id);
		if (! reservation.isPresent()) {
			throw new InstanceNotFoundException("project.entities.roomtypereservation", id);
		}
		return reservation.get();
	}

	@Override
	public Long addGuest(GuestReservation gr1) throws IncorrectReservationException {
		if(! reservationDao.existsById(gr1.getReservation().getId())) {
			throw new IncorrectReservationException();
		}
		if(guestDao.existsByDni(gr1.getGuest().getDni())) {
			Optional<Guest> guest = guestDao.findByDni(gr1.getGuest().getDni());
			if (guest.isPresent()) {
				gr1.setGuest(guest.get());
			}
		} else {
			guestDao.save(gr1.getGuest());
		}
		
		guestReservationDao.save(gr1);
		return gr1.getId();
	}

	@Override
	public GuestReservation findGuestReservationById(Long id) throws InstanceNotFoundException {
		Optional<GuestReservation> guestreservation = guestReservationDao.findById(id);
		if(! guestreservation.isPresent()) {
			throw new InstanceNotFoundException("project.entities.guestreservation", id);
		}
		return guestreservation.get();
	}


}
