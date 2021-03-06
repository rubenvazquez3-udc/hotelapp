package es.udc.hotelapp.backend.model.services;

import es.udc.hotelapp.backend.model.exceptions.DuplicateInstanceException;
import es.udc.hotelapp.backend.model.exceptions.IncorrectLoginException;
import es.udc.hotelapp.backend.model.exceptions.IncorrectPasswordException;
import es.udc.hotelapp.backend.model.exceptions.InstanceNotFoundException;
import es.udc.hotelapp.backend.model.entities.User;

public interface UserService {
	
	void signUp(User user) throws DuplicateInstanceException;
	
	User login(String userName, String password) throws IncorrectLoginException;
	
	User loginFromId(Long id) throws InstanceNotFoundException;
	
	User updateProfile(Long id, String firstName, String lastName, String email, String address) throws InstanceNotFoundException;
	
	void changePassword(Long id, String oldPassword, String newPassword)
		throws InstanceNotFoundException, IncorrectPasswordException;


}
