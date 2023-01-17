import React from "react";

export const showPassword = (inputType, showPasswordButton) =>{

    if(inputType.getAttribute('type') === 'password'){
        inputType.setAttribute('type', 'text')
        showPasswordButton.innerHTML = 'Ocultar senha'
    } else if(inputType.getAttribute('type') === 'text'){
        inputType.setAttribute('type', 'password')
        showPasswordButton.innerHTML = 'Mostrar senha' 
    }
    
  }