package com.danse.wedding.util;

public class DanseConstants {
    public static final String DELETE_ERROR = "Error deleting";
    public static final String REQUEST_ERROR = "There was an error in the incoming request";
    public static final String SUCCESS = "Success";
    public static final String CODE_OK = "200";
    public static final String CODE_SERVER_ERROR = "500";
    public static final String CODE_BAD_REQUEST = "400";
    public static final String CODE_CONFLICT = "409";
    public static final String MAIL_SUBJECT = "Confirmación boda - ";
    public static final String MAIL_TEXT = "<html>"
        +"<style>table {}"
        +"td, th {}"
        +"tr:nth-child(even) {}</style>"
        +"<body><h3>Confirmamos la asistencia a la boda de parte de <strong>%s</strong></h3>"
        +"<h4>Registraron a los siguientes invitados:</h4>"
        +"<table style=\"font-family: arial, sans-serif;border-collapse: collapse;width: 100%%;\">"
        +"<tr><th style=\"border: 1px solid #dddddd;text-align: left;padding: 8px;\">Nombre</th>"
        +"<th style=\"border: 1px solid #dddddd;text-align: left;padding: 8px;\">Menú</th>"
        +"<th style=\"border: 1px solid #dddddd;text-align: left;padding: 8px;\">Alergias</th></tr>";
    public static final String MAIL_TEXT_GUEST_ODD = "<tr style=\"background-color: #f2bdcd;\">"
        +"<td style=\"border: 1px solid #dddddd;text-align: left;padding: 8px;\">%s</td>"
        +"<td style=\"border: 1px solid #dddddd;text-align: left;padding: 8px;\">%s</td>"
        +"<td style=\"border: 1px solid #dddddd;text-align: left;padding: 8px;\">%s</td></tr>";
        public static final String MAIL_TEXT_GUEST_EVEN = "<tr style=\"background-color: #ffdae9;\">"
        +"<td style=\"border: 1px solid #dddddd;text-align: left;padding: 8px;\">%s</td>"
        +"<td style=\"border: 1px solid #dddddd;text-align: left;padding: 8px;\">%s</td>"
        +"<td style=\"border: 1px solid #dddddd;text-align: left;padding: 8px;\">%s</td></tr>";
    public static final String MAIL_END = "</table><p>Saludos</p><p>Danse</p><body></html>";
}
