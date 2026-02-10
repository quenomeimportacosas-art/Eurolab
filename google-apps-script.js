// =============================================
// GOOGLE APPS SCRIPT - Eurolab Contact Form
// =============================================
//
// INSTRUCCIONES DE CONFIGURACIÓN:
//
// 1. Abrí Google Sheets y creá una hoja nueva (o usá una existente)
//
// 2. En la primera fila (encabezados), poné estos títulos en las columnas:
//    A1: Fecha
//    B1: Nombre
//    C1: Empresa
//    D1: Email
//    E1: Celular
//    F1: Área
//
// 3. Andá a Extensiones > Apps Script
//
// 4. Borrá todo el código que aparece y pegá este archivo completo
//
// 5. Hacé clic en "Guardar" (ícono de disco)
//
// 6. Hacé clic en "Implementar" > "Nueva implementación"
//    - Tipo: "Aplicación web"
//    - Ejecutar como: "Yo" (tu cuenta)
//    - Quién tiene acceso: "Cualquier persona"
//    - Hacé clic en "Implementar"
//
// 7. Copiá la URL que te da (empieza con https://script.google.com/macros/s/...)
//
// 8. Pegá esa URL en contacto.html donde dice:
//    const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
//
// ¡Listo! Cada envío del formulario se guardará automáticamente en tu Google Sheet.
//

function doPost(e) {
    try {
        // Obtener datos del formulario
        var data = JSON.parse(e.postData.contents);

        // Abrir la hoja activa
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // Agregar fila con los datos
        sheet.appendRow([
            data.fecha || new Date().toLocaleString('es-AR'),
            data.nombre || '',
            data.empresa || '',
            data.email || '',
            data.celular || '',
            data.area || ''
        ]);

        // Respuesta exitosa
        return ContentService
            .createTextOutput(JSON.stringify({ result: 'success' }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Respuesta de error
        return ContentService
            .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Función para manejar solicitudes GET (para probar que el script funciona)
function doGet() {
    return ContentService
        .createTextOutput(JSON.stringify({ status: 'Script de Eurolab activo y funcionando' }))
        .setMimeType(ContentService.MimeType.JSON);
}
