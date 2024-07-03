package controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import dao.UserDAO;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        // Obtener los parámetros del formulario de login
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        
        // Instanciar el DAO para validar las credenciales
        UserDAO userDao = new UserDAO();
        boolean usuarioValido = userDao.validarUsuario(email,password);
        
        // Redirigir segin la validación
        if (usuarioValido) {
            response.sendRedirect("/proyectoJava_24112/pages/gestionUsuarios.html");
        } else {
            response.sendRedirect("index.html");
        }
    }
}
