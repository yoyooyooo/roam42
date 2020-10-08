/* globals   roam42, tippy, getRoamNavigator_IsEnabled     */

// roam42.roam42Menu 
(()=>{
  
  roam42.roam42Menu = {};
  roam42.roam42Menu.tippy = {};
  
  roam42.roam42Menu.Initialize = ()=> {
    if( window != window.parent ) { 
      return; //don't load if in a iframe
    }
    
    //create menu item
    var menu = document.createElement("div");
        menu.id='roam42-menu';
        menu.className = 'bp3-button bp3-minimal bp3-small bp3-icon-vertical-distribution';
        menu.setAttribute('style','position:relative;left:2px');
    var spacer = document.createElement("div");
      spacer.id="roam42-menu-spacer"
      spacer.setAttribute('style','flex: 0 0 3px');    
    document.querySelector('.roam-topbar .flex-h-box').appendChild(spacer);
    document.querySelector('.roam-topbar .flex-h-box').appendChild(menu);

    roam42.roam42Menu.tippy = tippy('#roam42-menu', {
      allowHTML: true,
      interactive: true,
      interactiveBorder: 5,
      arrow: false,
      trigger: 'click',
      position: 'auto-start',
      onShow(instance) {  instance.setContent( roam42.roam42Menu.displayMenu() ) },
      onMount(instance) {
        var bck = document.querySelector('#roam42-menu + div .tippy-box')
            bck.style.width="230px";
            bck.classList.add('bp3-popover');
            instance.setContent( roam42.roam42Menu.displayMenu() ); //force content in for sizing
            // bck.style.backgroundColor = 'white';
            // bck.style.backgroundColor = getComputedStyle(document.querySelector('.bp3-menu')).backgroundColor;
      },
    });

  }
  
    
  roam42.roam42Menu.displayMenu = ()=>{
    let menu = '';
    menu += `<div class="bp3-popover-content"><ul class="bp3-menu">`
    
    if( roam42.dailyNotesPopup != undefined ) {
      menu += `<li class="">
                   <a class="bp3-menu-item bp3-popover-dismiss">
                    <div class="bp3-text-overflow-ellipsis bp3-fill" onclick="roam42.roam42Menu.tippy[0].hide(); roam42.dailyNotesPopup.component.toggleVisible();">
                      <div class="bp3-button bp3-minimal bp3-small bp3-icon-timeline-events"></div>    
                      Daily Notes <span style="font-size:7pt">(Alt-Shift-,)</span>
                    </div>
                  </a>
                </li>`
    }
    
    if( roam42.turndownPage != undefined ) {
      menu += `<li class="">
                  <a class="bp3-menu-item bp3-popover-dismiss">
                    <div class="bp3-text-overflow-ellipsis bp3-fill" onclick="roam42.roam42Menu.tippy[0].hide(); roam42.typeAhead.typeAheadLookup();">
                      <div class="bp3-button bp3-minimal bp3-small bp3-icon-manual"></div>    
                      Dictionary <span style="font-size:7pt">(Alt-Shift-.)</span>
                    </div>
                  </a>
                </li>`
    }    
    
    if( roam42.privacyMode  != undefined ) {
      menu += `<li class="">
                  <a class="bp3-menu-item bp3-popover-dismiss">
                    <div class="bp3-text-overflow-ellipsis bp3-fill" onclick="roam42.roam42Menu.tippy[0].hide(); roam42.privacyMode.toggle();">
                      <div class="bp3-button bp3-minimal bp3-small bp3-icon-shield"></div>    
                      Privacy Mode <span style="font-size:7pt">(Ctrl+Alt-P)</span>
                    </div>
                  </a>
                </li>`
    }    
    
    
    menu += `<hr style="margin:0px; padding:0px">`
    
    menu += `<li class="">
                <a class="bp3-menu-item bp3-popover-dismiss">
                  <div class="bp3-text-overflow-ellipsis bp3-fill" onclick="roam42.roam42Menu.tippy[0].hide(); roam42.quickRef.component.toggleQuickReference();">
                      <div class="bp3-button bp3-minimal bp3-small bp3-icon-help"></div>    
                      Help (TBD) <span style="font-size:7pt">(Alt-Shift-H)</span>
                  </div>
                </a>
              </li>`


    // TOGGLE features
    
    menu += `<hr style="margin:0px; padding:0px">`

    menu += `<li style="padding-left:10px;margin-top:5px"><span style="font-size:9pt">Toggle Features On/Off:</span></li>`

        if( roam42.roamNavigator != undefined ) {
          menu += `<li class="" style="height:28px">
                <a class="bp3-menu-item bp3-popover-dismiss">
                  <div class="bp3-text-overflow-ellipsis bp3-fill" onclick=" roam42.roam42Menu.tippy[0].hide(); roamNavigatorStatusToast()">
                    <span style="font-size:8pt;padding-left:15px">
                      Deep Jump Nav <span style="font-size:7pt">${getRoamNavigator_IsEnabled() ? ' (Active)' : '(Disabled)'  }
                    </span>
                  </div>
                </a>
              </li>`
        }

        if( roam42.livePreview != undefined ) {
          menu += `<li class="" style="height:25px">
                <a class="bp3-menu-item bp3-popover-dismiss">
                   <div class="bp3-text-overflow-ellipsis bp3-fill" onclick="roam42.roam42Menu.tippy[0].hide(); roam42.livePreview.livePreviewStatusToast()">
                    <span style="font-size:8pt;padding-left:15px">
                       Live Preview <span style="font-size:7pt">${roam42.livePreview.getRoamLivePreviewState() > 0 ? ' (Active)' : '(Disabled)'  }
                    </span>
                  </div>
                </a>
              </li>`
        }

        if( roam42.autocomplete != undefined ) {
          menu += `<li class="" style="height:25px">
                <a class="bp3-menu-item bp3-popover-dismiss">
                   <div class="bp3-text-overflow-ellipsis bp3-fill" onclick="roam42.roam42Menu.tippy[0].hide(); roam42.autocomplete.autoCompleteStatusToast()">
                    <span style="font-size:8pt;padding-left:15px">
                       Auto-complete <span style="font-size:7pt">${roam42.autocomplete.getAutoComplete_IsEnabled() > 0 ? ' (Active)' : '(Disabled)'  }
                    </span>
                  </div>
                </a>
              </li>`
        }    
    

    menu += `<hr style="margin:0px; margin-top:5px; padding:0px">`
    menu += `<li  style="padding-left:10px;margin-top:5px"><span style="font-size:7pt;padding-left:15px;color:grey;">${roam42.buildID}</span></li>`

    menu += `</ul></div>`
    
    return menu;
  }
  
  roam42.roam42Menu.testingReload = ()=>{
    try {  
      document.querySelector('#roam42-menu').remove()
      document.querySelector('#roam42-menu-spacer').remove()
    } catch(e) {}  
    roam42.loader.addScriptToPage( 'roam42Menu',  roam42.host + 'ext/roam42Menu.js'    )
    setTimeout(()=>{
      roam42.roam42Menu.Initialize()
    }, 500)
  }


})();