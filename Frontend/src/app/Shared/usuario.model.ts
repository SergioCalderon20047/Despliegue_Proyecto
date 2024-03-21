export class datosModel {

    constructor (
        public Id_Dato_Personal: string,
        public fk_tipo_doc: string,
        public numero_doc: string,
        public nombre1: string,
        public nombre2: string,
        public apellido1: string,
        public apellido2: string,
        public fk_tipo_rol: string,
        public correo: string,
        public celular: string,
        public usuario: string,
        public password: string,
        public foto: string
    ){}
}

export class perfilModel {
    constructor (
        public Id_Dato_Personal: string,
        public fk_tipo_doc: string,
        public numero_doc: string,
        public nombre1: string,
        public nombre2: string,
        public apellido1: string,
        public apellido2: string,
        public fk_tipo_rol: string,
        public Direccion: string,
        public Num_Local: string,
        public correo: string,
        public celular: string,
        public usuario: string,
        public password: string,
        public foto: string
    ) {}

} 

export class productomodel {
    constructor (
        public Id_Producto: string,
        public Id_Rol: string,
        public Id_Peso: string,
        public Id_Categoria: string,
        public Id_Reserva: string,
        public Nombre_Producto: string,
        public Cantidad: string,
        public Descripcion: string,
        public Url_Imagen: string,
        public Estado: number
    ) {}
}

export class productoconpesomodel {
    constructor (
        public Id_Producto: string,
        public Id_Rol: string,
        public pesodesc: string,
        public Id_Categoria: string,
        public Id_Reserva: string,
        public Nombre_Producto: string,
        public Cantidad: string,
        public Descripcion: string,
        public Url_Imagen: string,
        public Estado: number
    ) {}
}

export class pesosmodel {
    constructor (
        public Id_Peso: string,
        public Descripcion: string,
    ) {}
}

export class categoriasmodel {
    constructor (
        public Id_Categoria: string,
        public Nombre_Categoria: string,
    ) {}
}

export class reservasmodel {
    constructor (
        public Id_Reserva: string,
        public Fecha_Inicio: string,
        public Duracion: string,
        public Estado: string,
    ) {}
}

export class rolesmodel {
    constructor (
        public Id_Rol: string,
        public nom_rol: string,
        public estado: string,
    ) {}
}