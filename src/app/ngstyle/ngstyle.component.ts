import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngstyle',
  templateUrl: './ngstyle.component.html',
  styleUrls: ['./ngstyle.component.css']
})
export class NgstyleComponent implements OnInit {
  /*colorBg = "white";
  colorTema = "black";
  myclass = 'dark';*/
  iconVisibility:string = "visibility"
  habilityDesability = "Mostrar Clientes"
  mostrarlistaClientes: boolean = false;
  nomeCompleto: string = "";
  telefone: string = "";
  idade: string = "";
  cep: any = "" ;
  endereco: string = "";
  bairro: string = "";
  nroLocal: string = "";
  cidade: string = "";
  UF: string = "";
  clientes: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  //api cep 
  preencherEndereco (enderecoApi:any) {
    this.endereco = enderecoApi.logradouro;
    this.bairro = enderecoApi.bairro;
    this.cidade = enderecoApi.localidade;
    this.UF = enderecoApi.uf;
    this.telefone = enderecoApi.ddd;
  } 
  //validação da api e tratamento de erros
  

  pesquisarCep = async () => {
    const api = `https://viacep.com.br/ws/${this.cep}/json/`;
    const dadosApi = await fetch(api);
    const enderecoApi = await dadosApi.json()
    //validação da api e tratamento de erros
    if(this.cep.length == 8 && /^[0-9]+$/.test(this.cep)){
      this.preencherEndereco(enderecoApi)
      if(enderecoApi){
        if (enderecoApi.hasOwnProperty('erro')) {
          this.endereco = "Cep não encontrado";
      } else {
        this.preencherEndereco(enderecoApi)
      }
      }
    } else {
      this.endereco = "CEP inválido"
    }

  }
  //funcionalidades da aplicação
  cancelar() {
    this.nomeCompleto = "";
    this.telefone = "";
    this.idade = "";
    this.cep = "";
    this.endereco = "";
    this.bairro = "";
    this.nroLocal = "";
    this.cidade = "";
    this.UF = "";
  }
  salvar() {
    this.clientes.push({
      nomeCliente: this.nomeCompleto,
      idade: this.idade,
      nroTelefone: this.telefone,
      logradouro: this.endereco,
      bairro: this.bairro,
      nroCasa: this.nroLocal,
      cidade: this.cidade,
      estado: this.UF
    })
    this.cancelar()
  }
  removerCliente(i: number) {
    this.clientes.splice(i, 1)
  }

  
  mostrarClientes(){
     if(this.mostrarlistaClientes == true){
       this.habilityDesability = "Mostrar Clientes";
       this.iconVisibility = "visibility";
     } else {
       this.habilityDesability = "Ocultar Clientes";
       this.iconVisibility = "visibility_off";
     }
     this.mostrarlistaClientes = !this.mostrarlistaClientes;
   }

}

