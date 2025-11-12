package com.mco.docker.server.modules.service;

import com.mco.docker.server.modules.model.User;
import com.mco.docker.server.modules.model.UserDto;
import com.mco.docker.server.modules.repository.UserRepository;
import com.mco.docker.server.utils.ApiResponse;
import com.mco.docker.server.utils.TypesResponse;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(new ApiResponse(users, "Lista de usuarios", TypesResponse.SUCCESS), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {Exception.class})
    public ResponseEntity<ApiResponse> postUser(UserDto dto){
        ResponseEntity<ApiResponse> validacion;

        validacion = validarLongitudCampo(dto.getCorreo(), 50, "El correo excede el número de caracteres");
        if (validacion != null) return validacion;

        validacion = validarLongitudCampo(dto.getTelefono(), 10, "El teléfono excede el número de caracteres");
        if (validacion != null) return validacion;

        validacion = validarLongitudCampo(dto.getNombre(), 50, "El nombre completo excede el número de caracteres");
        if (validacion != null) return validacion;

        validacion = validarLongitudCampo(dto.getApellidoMaterno(), 50, "El apellido materno excede el número de caracteres");
        if (validacion != null) return validacion;

        validacion = validarLongitudCampo(dto.getApellidoPaterno(), 50, "El apellido paterno excede el número de caracteres");
        if (validacion != null) return validacion;

        User user = new User();
        user.setNombre(dto.getNombre());
        user.setApellidoPaterno(dto.getApellidoPaterno());
        user.setApellidoMaterno(dto.getApellidoMaterno());
        user.setCorreo(dto.getCorreo());
        user.setTelefono(dto.getTelefono());
        userRepository.save(user);
        return new ResponseEntity<>(new ApiResponse(user, "Usuario guardado", TypesResponse.SUCCESS), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {Exception.class})
    public ResponseEntity<ApiResponse> putUser(UserDto dto){
        Optional<User> userOptional = userRepository.findById(dto.getId());
        if(userOptional.isEmpty()){
            return new ResponseEntity<>(new ApiResponse(null, "Usuario no encontrado", TypesResponse.WARNING), HttpStatus.NOT_FOUND);
        }

        ResponseEntity<ApiResponse> validacion;

        validacion = validarLongitudCampo(dto.getCorreo(), 50, "El correo excede el número de caracteres");
        if (validacion != null) return validacion;

        validacion = validarLongitudCampo(dto.getTelefono(), 10, "El teléfono excede el número de caracteres");
        if (validacion != null) return validacion;

        validacion = validarLongitudCampo(dto.getNombre(), 50, "El nombre completo excede el número de caracteres");
        if (validacion != null) return validacion;

        validacion = validarLongitudCampo(dto.getApellidoMaterno(), 50, "El apellido materno excede el número de caracteres");
        if (validacion != null) return validacion;

        validacion = validarLongitudCampo(dto.getApellidoPaterno(), 50, "El apellido paterno excede el número de caracteres");
        if (validacion != null) return validacion;
        User user = userOptional.get();
        user.setNombre(dto.getNombre());
        user.setApellidoPaterno(dto.getApellidoPaterno());
        user.setApellidoMaterno(dto.getApellidoMaterno());
        user.setCorreo(dto.getCorreo());
        user.setTelefono(dto.getTelefono());
        userRepository.save(user);
        return new ResponseEntity<>(new ApiResponse(user, "Usuario actualizado", TypesResponse.SUCCESS), HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse> deleteUser(Long id){
        Optional<User> userOptional = userRepository.findById(id);
        if(userOptional.isEmpty()){
            return new ResponseEntity<>(new ApiResponse(null, "Usuario no encontrado", TypesResponse.WARNING), HttpStatus.NOT_FOUND);
        }
        userRepository.deleteById(id);
        return new ResponseEntity<>(new ApiResponse(null, "Usuario eliminado", TypesResponse.SUCCESS), HttpStatus.OK);
    }


    private ResponseEntity<ApiResponse> validarLongitudCampo(String valor, int longitudMaxima, String mensajeError) {
        if (valor != null && valor.length() > longitudMaxima) {
            return new ResponseEntity<>(new ApiResponse(null, mensajeError, TypesResponse.WARNING), HttpStatus.BAD_REQUEST);
        }
        return null;
    }

}
