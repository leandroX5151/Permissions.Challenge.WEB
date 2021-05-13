<template>
<div>
    <HeaderSectionComponent title="Registro de solicitudes" description="Listado de permisos asignados a empleados."></HeaderSectionComponent>  
    <hr>    
    <table class="table table-striped table-hover" v-if="permisos">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Tipo de permiso</th>
            <th scope="col">Fecha</th>
            <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr  v-if="!permisos || permisos.length === 0">
                <td colspan="6">
                    <div class="alert alert-primary" role="alert">
                            No hay registros para mostrar
                    </div>
                </td>
            </tr>
            <tr v-for="p in permisos" v-bind:key="p.id">
                <th scope="row">{{p.id}}</th>
                <td>{{p.nombreEmpleado}}</td>
                <td>{{p.apellidosEmpleado}}</td>
                <td>{{p.tipoPermiso.descripcion}}</td>
                <td>{{p.fecha | moment('DD/MM/YYYY')}}</td>
                <td>
                    <router-link class="btn btn-sm btn-secondary" :to="{ name: 'permissionForm', params: {id: p.id, action: 'edit' } }"><i class="fas fa-address-card fs-5">edit</i></router-link>
                    <router-link class="btn btn-sm btn-secondary" :to="{ name: 'permissionForm', params: {id: p.id, action: 'delete' } }"><i class="fas fa-address-card fs-5">trash-alt</i></router-link>
                </td>
            </tr>
            <tr>
                <td colspan="5"></td>
                <td><router-link class="btn btn-md btn-primary" :to="{ name: 'permissionForm', params: {action: 'add' } }" role="button">Nuevo permiso</router-link></td>                   
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import HeaderSectionComponent from '../Share/HeaderSectionComponent.vue'
import axios from 'axios'
import Global from '../Utils/Global.js'

export default {
  name: "PermissionsTableComponent",
  props: {
    msg: String
  },
    components:{
        HeaderSectionComponent
  },
    mounted(){ 
      this.getPermissions();
  },
    data() {
        return {
            permisos: []
        };
    },
    methods: {
        getPermissions() {
            axios.get(Global.url + 'get')
            .then(result => {
                if(result.status == 200) {
                    this.permisos = result.data;
                }
            });
        }
    }
}
</script>

