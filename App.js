import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, AsyncStorege} from 'react-native';

export default function App() {
  
  const [estado,setarEstado] = useState ('leitura');
  const [anotacao,setarAnotacao] = useState ('');

  useEffect(()=>{

    (async () => {
        try{
          const anotacaoLeitura = await AsyncStorege.getItem('rascunho')
          setarAnotacao(anotacaoLeitura);
        }catch(error){}


    })();
    

    },[])


  

  setData = async() => {
      try{
          await AsyncStorege.setItem('rascunho',anotacao);
      }catch(error){

      }

      alert('Salvo')
  }

  function atualizarTexto(){
    setarEstado('leitura');
    setData();
  }

  if(estado == 'leitura'){  
  return (
    <View style={{flex:1,backgroundColor:'#bee09f'}}>
      <StatusBar hidden/>
      <Text style={{width:'100%',textAlign: 'center',backgroundColor:'#069',padding:20,color:'white',fontSize:30}}>Rascunho</Text>
      {
      
      (anotacao != '')?

      <Text style={{padding:25}}>{anotacao}</Text>
      :
      <Text style={{padding:25,opacity:0.3}}>Nenhuma anotação encontrada :(</Text>
      }   

      <TouchableOpacity onPress={()=> setarEstado('atualizando')} style={{backgroundColor:'#ff0000',position:'absolute',right:20,bottom:20,width:50,height:50,borderRadius:25}}>
      
      
      <Text style={{color:'white',position:'relative',textAlign:'center',top:3,fontSize:30}}>+</Text>
      
      </TouchableOpacity>      
    </View>    
  )
  }else if(estado == 'atualizando')
     return (
      <View style={{flex:1,backgroundColor:'#bee09f'}}>
      <StatusBar hidden/>
      <Text style={{width:'100%',textAlign: 'center',backgroundColor:'#069',padding:20,color:'white',fontSize:30}}>Rascunho</Text>
              
      <TextInput autoFocus={true} onChangeText={(text) => setarAnotacao(text)} style={{padding:10,hidden:300,textAlignVertical:'top',marginTop:10}} multiline={true} numberOfLines={5}></TextInput>

      <TouchableOpacity onPress={()=> atualizarTexto()} style={{backgroundColor:'#ff0000',position:'absolute',right:20,bottom:25,width:75,height:50,borderRadius:10}}><Text style={{position:'absolute',right:10,bottom:10,width:60,padding:10,textAlign:'center',color:'white',borderRadius:10}}>salvar</Text></TouchableOpacity>        
      </View> 
          );
    }
