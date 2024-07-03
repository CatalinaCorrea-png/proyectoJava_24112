package dao;

import conexion.ConexionDB;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class UserDAO {
    
    public boolean validarUsuario(String email, String password){
        boolean validar = false;
        
        String sql = "SELECT * FROM login WHERE email = ? AND contrasena = ?";
        
        try {
            Connection conn = ConexionDB.obtenerConexion();
            PreparedStatement pstmt = conn.prepareStatement(sql);
            
            pstmt.setString(1, email);
            pstmt.setString(2, password);
            
            ResultSet resultado = pstmt.executeQuery();
            validar = resultado.next();
        } catch (SQLException e){
            e.printStackTrace();
        }
        return validar;
    }
}
