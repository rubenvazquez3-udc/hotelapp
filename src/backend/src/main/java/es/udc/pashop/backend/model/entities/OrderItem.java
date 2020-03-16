package es.udc.pashop.backend.model.entities;

import java.math.BigDecimal;
import java.math.RoundingMode;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

@Entity
public class OrderItem {
	
	private Long id;
	private Product product;
	private Order order;
	private BigDecimal productPrice;
	private int quantity;
	
	public OrderItem() {}
	
	public OrderItem(Product product, BigDecimal productPrice, int quantity) {
		
		this.product = product;	
		this.productPrice = productPrice;
		this.quantity = quantity;
		
		productPrice.setScale(2, RoundingMode.HALF_EVEN);
		
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	@ManyToOne(optional=false, fetch=FetchType.LAZY)
	@JoinColumn(name="productId")
	public Product getProduct() {
		return product;
	}
	
	public void setProduct(Product product) {
		this.product = product;
	}
	
	@ManyToOne(optional=false, fetch=FetchType.LAZY)
	@JoinColumn(name="orderId")
	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}
	
	public int getQuantity() {
		return quantity;
	}
	
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	public BigDecimal getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(BigDecimal productPrice) {
		this.productPrice = productPrice.setScale(2, RoundingMode.HALF_EVEN);
	}
	
	@Transient
	public BigDecimal getTotalPrice() {
		return productPrice.multiply(new BigDecimal(quantity));
	}

}
