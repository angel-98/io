// modelo de creacion del modelo orienta objetos
// clase de dispositivo
export class Disp{
	// defenir variables

	// defenir constructores puede haber mas de uno
	constructor(
		// parametros(variables) de constructor- nivel de acceso -: que tipo de atributo es  
		public nombre:string,
		public descripcion:string,
		public estatus:boolean, //True Online- False OffLine
		public tipo:number
		// public estado:string
		) {
		// code..
		//this.estatus=false;
	}
}