<template>
<div>
    <HeaderSectionComponent title="Editar permiso" description="Formulario de edición de datos de permisos a empleados."></HeaderSectionComponent>  
    <hr>
    <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
            <form class="row g-3" @submit.prevent="submit()">
                <div class="col-md-6">
                    <label class="form-label">Nombre</label>
                    <input type="text" class="form-control" name="nombreEmpleado" v-model="permission.nombreEmpleado" required pattern="[a-zA-Z_ ]*" title="Solo letras" maxlength="50">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Apellido</label>
                    <input type="text" class="form-control" name="apellidosEmpleado" v-model="permission.apellidosEmpleado" required pattern="[a-zA-Z_ ]*" title="Solo letras" maxlength="50">
                </div>
                <div class="col-md-8">
                    <label class="form-label">Fecha</label>
                    <input type="date" name="fecha" class="form-control"  v-model="permission.fecha" placeholder="fecha" min="2021-05-10" max="2022-12-31" required>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Tipo de permiso</label>                    
                    <select v-model="permission.tipoPermisoId" class="form-control" name="tipoPermisoId" required>
                        <option v-for="ptype in permissionType" :value="ptype.id" :key="ptype.id">{{ptype.descripcion}}</option>
                    </select>
                </div>
                <div class="col-8">                    
                </div>
                <div class="col-2">                    
                    <router-link class="btn btn-primary" to="/">Cancelar</router-link>
                </div>
                <div class="col-2">
                    <button type="submit" class="btn btn-primary">{{buttonText}}</button>
                </div>
            </form>
        </div>
        <div class="col-3"></div>
    </div>
 </div>
</template>

<script>
import HeaderSectionComponent from '../Share/HeaderSectionComponent.vue';
import axios from 'axios';
import swal from 'sweetalert';
import Permissions from '../Models/Permissions.js';
import PermissionType from '../Models/PermissionType.js';

export default {
  name: "PermissionsFormComponent",
  props: {
    msg: String
  },
    components:{
        HeaderSectionComponent
  },
  mounted() { 
      this.urlId = this.$route.params.id;
      this.action = this.$route.params.action;  
      this.setButtonText();    
      this.getPermissionsType();
      this.getPermissions();      
  },
  data() {
      return{
           permission: new Permissions('','','',null, null),
           permissionType: new PermissionType(''),
           urlId: null,
           action: null,
           buttonText : null,
           submitted: false
      };
  },
  methods:{
        setButtonText() {
            switch(this.action) {
                case 'delete': 
                    this.buttonText = 'Eliminar';
                    break;
                case 'add': 
                    this.buttonText = 'Registrar';
                    break;
                case 'edit': 
                    this.buttonText = 'Actualizar';
                    break;
            }

        },
        getPermissionsType() {                
            axios.get('https://localhost:44344/api/tipopermiso/get/')
            .then(result => {                
                if(result.status == 200) {
                    this.permissionType = result.data;
                }
           });
        },
        getPermissions() {           
            if(this.action == 'edit' || this.action == 'delete' ) {
                axios.get('https://localhost:44344/api/permiso/get/' + this.urlId)
                .then(result => {
                    if(result.status == 200) {
                        this.permission = result.data;
                    }
            });
            }
        },
        submit() {
                switch(this.action) {
                    case 'add':
                        axios.post('https://localhost:44344/api/permiso/add/',this.permission)
                            .then(response => {
                                if(response.status == 200 ) {
                                    swal('Registro de permisos','El permiso se registro exitosamente', 'success');
                                    this.$router.push('/permissions-list');
                                } else {
                                swal('Eliminar permiso','Algo salió mal al intentar ejecutar la acción', 'error');
                                }
                            })
                            .catch(error => {
                                
                                console.log(error);
                            });
                        break;
                    case 'edit':
                        this.permission.tipoPermiso = null;
                        axios.put('https://localhost:44344/api/permiso/update/',this.permission)
                            .then(response => {
                                if(response.status == 200 ) {
                                    swal('Actualización de permisos','El permiso se actualizó exitosamente', 'success');
                                    this.$router.push('/permissions-list');
                                } else {
                                swal('Eliminar permiso','Algo salió mal al intentar ejecutar la acción', 'error');
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                        break;
                    case 'delete':                    
                        swal({
                        title: "Eliminar permiso", text: "¿Confirma la acción de eliminar el permiso seleccionado?", icon: "warning",
                        buttons: true, dangerMode: true,})
                        .then((willDelete) => {
                            if (willDelete) {
                            axios.delete('https://localhost:44344/api/permiso/delete/' + this.urlId)
                                .then(response => {
                                    swal('Eliminar permiso','El permiso se eliminó exitosamente', 'success');
                                    if(response.status == 200 ) {
                                        this.$router.push('/permissions-list');
                                    } else {
                                    swal('Eliminar permiso','Algo salió mal al intentar ejecutar la acción', 'error');
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                            } else {
                                swal("Se canceló la orden de eliminar. No se borró ningún registro.");
                            }
                        });
                        break;
                }
            }
    }
}

</script>