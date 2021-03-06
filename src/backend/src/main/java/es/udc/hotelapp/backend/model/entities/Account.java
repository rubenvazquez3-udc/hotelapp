package es.udc.hotelapp.backend.model.entities;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

@Entity
public class Account {

	private Long id;
	private RoomTypeReservation reservation;
	private Set<AccountItem> items = new HashSet<>();

	public Account(RoomTypeReservation reservation) {
		this.reservation = reservation;
	}

	public Account() {}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	@OneToOne(optional=false, fetch= FetchType.LAZY)
	@JoinColumn(name="reservationId")
	public RoomTypeReservation getReservation() {
		return reservation;
	}

	public void setReservation(RoomTypeReservation reservation) {
		this.reservation = reservation;
	}

	@OneToMany(mappedBy = "account")
	public Set<AccountItem> getItems() {
		return items;
	}

	public void setItems(Set<AccountItem> items) {
		this.items = items;
	}


	@Transient
	public BigDecimal getTotalPrice() {
		return items.stream().map(i -> i.getTotalPrice()).reduce(new BigDecimal(0), (a,b) -> a.add(b));
	}
	
	
	public void addItem(AccountItem item) {
		items.add(item);
		item.setAccount(this);
	}
	
	@Transient
	public Optional<AccountItem> getItem (String name){
		return items.stream().filter(item -> item.getName().equals(name)).findFirst();
	}
}
