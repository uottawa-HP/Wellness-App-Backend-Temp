import React from 'react';
import {View, Text} from 'react-native';
import { Feather } from '@expo/vector-icons';

//Basic block which can be used on any page.
const Block = (props:any)=>{
  return(
    <View style = {{marginTop: props.marginTop, marginBottom: props.marginBottom,flex: props.flex}}>
      {/* If props.outerTitle is supplied, render the outer title */}
      {(props.outerTitle)?(<Text style = {{marginLeft: '2.5%', fontWeight: 'bold'}}>{props.outerTitle}</Text>):(<Text/>)}
      <View style = {{alignItems: 'center'}}>
        <View style={{width: '95%', height: props.height, borderRadius: 10,borderStyle: 'solid', borderWidth: 1, flexDirection: 'row'}}>
          {/* If props.icon is supplied, render the left icon */}
          {(props.icon)?(
          <View style = {{flex:1}}>
            <Feather name={props.icon} style = {{margin:'auto'}} size={25}/>
          </View>
          ):(<View/>)}
          <View style = {{flex:15}}>
            {/* If props.innerTitle is supplied, render the inner title */}
            {(props.innerTitle)?(<Text style = {{fontWeight: 'bold'}}>{props.innerTitle}</Text>):(<Text/>)}
            {/* Render children provided (content) */}
            {props.children}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Block;
