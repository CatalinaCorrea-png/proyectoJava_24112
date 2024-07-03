
package conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionDB {
    
    private static final String url = "jdbc:mysql://localhost:3306/proyectojava_24112";
    private static final String user = "root";
    private static final String password = "oreocookie44253978";
    

    public static Connection obtenerConexion() throws SQLException {
        try {
            //Cargar el driver
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException ex) {
            throw new SQLException("No se encontro el driver JCDB", ex);
        }
        return DriverManager.getConnection(url, user, password);
    }


    // Prueba de conexion
//    public static void main(String[] args){
//        try{
//            Connection con = ConexionDB.obtenerConexion();
//            if (con != null){
//                System.out.println("Conexion exitosa");
//            }
//        } catch (SQLException e){
//            System.out.println(e.getMessage());
//        }
//    }
    
}