package es.udc.hotelapp.backend.model.entities;

import org.springframework.data.domain.Slice;

public interface CustomizedProductDao {
	
	Slice<Product> find( Long hotelid, String name, int page, int size);

}
