//public functions///////////////////////////////////////
function ce(obj){
  let rst = document.createElement(obj.tagname || "div");
  for(let x in obj) 
    switch(x){
      case "tagname": break;
      case "innerHTML":case "innerText":case "textContent": 
        rst[x] = obj[x]; 
      break;
      case "event_":
        for(let y in obj[x]) rst.addEventListener(y,obj[x][y],false);
      break;
      case "ch_": rst.append(...obj[x].map(el=>ce(el))); break;
      case "export_": fh[obj[x]]=rst; break;
      default: rst.setAttribute(x,obj[x]);
    }
  return rst;
}

async function fe(url,cb){
  try {
    const res = await fetch(url);
    switch(res.status)
    {
      case 200: cb(await res.json()); break;
      default : error_handling(`Url ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    error_handling(error);
  }
}

function error_handling(err){
  fh.main_display.innerHTML = `<h3 class="error">${err}</h3>`;
}
//public functions end///////////////////////////////////
//event handling///////////////////////////////////////
const on_city_search_submit = (evt)=>{
  evt.preventDefault();
  let word = fh.search_input.value;
  fe(`https://wttr.in/${word}?format=j1`,(rst)=>{
    let cleaned = clean_data(rst,word);
    create_previous_record(cleaned);
    create_weather_card(cleaned);
  })
  fh.main_display.innerHTML = "<h3>Loading....</h3>";
  fh.search_input.value = "";
}

const on_previous_li_click = (evt) => {
  create_weather_card(fh.previous_records[evt.target.innerText]);
}

const on_convert_submit = (evt) => {
  evt.preventDefault();
  let toc = document.querySelector("#to-c");
  let val = fh.convert_temperature_input.value;
  fh.convert_temperature_display.innerHTML="dadas"
  fh.convert_temperature_display.innerHTML = (toc.checked ? (val-32)*0.5556 : (val*1.8)+32).toFixed(2);
}
const on_convert_input_focus = (evt) =>{
  evt.target.select();
}
const on_change_temperature_unit = (evt) => {
  fh.display_on_fahrenheit = !fh.display_on_fahrenheit;
  document.querySelectorAll(".celsius,.fahrenheit").forEach(el=>el.classList.toggle("hidden"));
}
//event handling///////////////////////////////////////

//structure functions///////////////////////////////////////
function clean_data(json,search_word){
  const rst = {};
  let [area,region,country]= [[],[],[]];
  for(let x of json.nearest_area)
  {
    if(Array.isArray(x.areaName))
      area = area.concat(x.areaName.map(el=>el.value));  
    if(Array.isArray(x.region))
      region = region.concat(x.region.map(el=>el.value));
    if(Array.isArray(x.country))
      country = country.concat(x.country.map(el=>el.value));
  }
  rst['search_word'] = search_word;
  rst["area"] = area.join(",");
  rst["region"] = region.join(",");
  rst["country"] = country.join(",");
  rst['FeelsLikeC']=json.current_condition[0].FeelsLikeC;
  rst['FeelsLikeF']=json.current_condition[0].FeelsLikeF;
  rst['temp_C']=json.current_condition[0].temp_C;
  rst['temp_F']=json.current_condition[0].temp_F;
  rst['threedaysforecast']=json.weather.map(el=>({
    "avgtempC":el.avgtempC,
    "avgtempF":el.avgtempF,
    "date":el.date,
    "maxtempC":el.maxtempC,
    "maxtempF":el.maxtempF,
    "mintempC":el.mintempC,
    "mintempF":el.mintempF,
  }));
  rst['chanceofsunshine'] = json.weather[0].hourly[0]['chanceofsunshine'];
  rst['chanceofrain'] = json.weather[0].hourly[0]['chanceofrain'];
  rst['chanceofsnow'] = json.weather[0].hourly[0]['chanceofsnow'];
  rst['weatherDesc']=json.current_condition[0].weatherDesc[0];
  return rst;
}
function header_str(){
  return {
    tagname:"header",
    ch_:[
      {
        tagname:"h1",
        innerText :"Weather App",
      },
      {
        tagname:"form",
        event_:{"submit":on_city_search_submit},
        ch_:[
          {
            tagname:"label",
            innerText:"Pick a location:",
            ch_:[{
              tagname:"input",
              type:"text",
              export_:"search_input",
            }]
          },
          {
            tagname:"input",
            type:"submit",
            value:"Get Weather",
          },
        ]
      },
      {
        innerText:"Display temperature by: ",
        style:"padding:10px;",
        ch_:[
          {tagname:"label",style:"margin: 0px 20px;",innerText:"Celsius",ch_:[
            {tagname:"input",type:"radio",name:"displayTemperatureUnit",event_:{"change":on_change_temperature_unit}},
          ]},
          {tagname:"label",innerText:"Fahrenheit",ch_:[
            {tagname:"input",type:"radio",name:"displayTemperatureUnit",event_:{"change":on_change_temperature_unit},checked:""},
          ]},
        ]
      }
    ]
  }
}
function main_str(){
  return {
    class:"container",
    ch_:[
      {
        tagname:"aside",
        ch_:[
          {tagname:"p",innerText:"Convert the temperature:"},
          {
            tagname:"form",
            event_:{"submit":on_convert_submit},
            ch_:[
              {tagname:"input",id:"temp-to-convert",type:"number",event_:{"focus":on_convert_input_focus},export_:"convert_temperature_input"},
              {style:"margin:20px 0px;",ch_:[{tagname:"label",innerText:"To Celsius: ",ch_:[{tagname:"input",type:"radio",id:"to-c",name:"convert-temperature"}]},]},
              {ch_:[{tagname:"label",innerText:"To Fahrenheit: ",ch_:[{tagname:"input",type:"radio",id:"to-f",name:"convert-temperature",checked:""}]},]},
              {tagname:"h4",export_:"convert_temperature_display"},
              {tagname:"input",type:"submit",value:"Convert"},
            ]
          }
        ]
      },
      {
        tagname:"main",
        innerText:"Choose a location to view the weather",
        export_:"main_display",
      },
      {
        tagname:"aside",
        ch_:[{
          tagname:"section",
          ch_:[
            {tagname:"strong",innerText:"Previous Searches",},
            {tagname:"p",export_:"previous_hint",innerText:"No previous searches",},
            {tagname:"ul",export_:"previous_ul"},
          ]
        }]
      },
    ]
  }
}

function create_previous_record(json){
  let idx_search_word = json.search_word || json.area;
  fh.previous_records[idx_search_word] = json;

  fh.previous_ul.prepend(ce({tagname:"li",ch_:[
    {tagname:"a",href:"#",innerText:idx_search_word,event_:{"click":on_previous_li_click}},
    {tagname:"span",innerText:" - "},
    {tagname:"span",class:"celsius",ch_:[{tagname:"span",innerText:json.FeelsLikeC},{tagname:"span",innerHTML:"&#8451"}]},
    {tagname:"span",class:"fahrenheit",ch_:[{tagname:"span",innerText:json.FeelsLikeF},{tagname:"span",innerHTML:"&#8457"}]},
  ]}));
  if(fh.previous_ul.childNodes.length>0) fh.previous_hint.remove();
}

function create_weather_card(json){
  const strong_p_set = (s1,p1,class_="") =>{
    let p = ce({tagname:"p",class:class_,});
    p.prepend(ce({tagname:"strong","innerText":s1}));
    p.append(ce({tagname:"span","innerText":p1}));
    return p;
  };
  const sps_temperture = (title,text_c,text_f) => {
    let p = ce({tagname:"p"});
    p.prepend(ce({tagname:"strong",innerHTML:title}));
    p.append(ce({tagname:"span",ch_:[{tagname:"span","innerText":text_c},{tagname:"span",innerHTML:"&#8451"}],class:"celsius",}));
    p.append(ce({tagname:"span",ch_:[{tagname:"span",innerText:text_f},{tagname:"span",innerHTML:`&#8457;`}],class:"fahrenheit"}));
    return p;
  }
  fh.main_display.innerHTML = "";
  let primary_card = ce({tagname:"article",class:"card"});
  ////////////////first card
  primary_card.append(ce({tagname:"h2",innerText:json.search_word}));
  
  let icon;
  if(json.chanceofsunshine>50){
    icon = ce({tagname:"img",src:"./assets/icons8-summer.gif",alt:"sun"});
  }else if(json.chanceofrain>50){
    icon = ce({tagname:"img",src:"./assets/icons8-torrential-rain.gif",alt:"rain"});
  }else if(json.chanceofsnow>50){
    icon = ce({tagname:"img",src:"./assets/icons8-light-snow.gif",alt:"snow"});
  }else{
    icon = ce({tagname:"h3",innerText:json.weatherDesc.value});
  }
  primary_card.append(
    icon,
    strong_p_set("Nearest Area: ",json.area),
    strong_p_set("Region: ",json.region),
    strong_p_set("Country: ",json.country),
    sps_temperture(`Currently temperture: `,json.temp_C,json.temp_F),
    sps_temperture(`Currently: <span style="font-weight:normal;">Feels like </span>`,json.FeelsLikeC,json.FeelsLikeF),
    strong_p_set("Chance of Sunshine: ",json.chanceofsunshine),
    strong_p_set("Chance of Rain: ",json.chanceofrain),
    strong_p_set("Chance of Snow: ",json.chanceofsnow),
  );
  //////////////////second card
  let secondary_card = ce({tagname:"article",class:"secondary_card"});
  let days = {0:"Today",1:"Tomorrow",2:"Day After Tomorrow"};
  json.threedaysforecast.forEach((el,idx)=>{
    let card = ce({class:"card",ch_:[{tagname:"strong",innerText:days[idx]}]});
    card.append(
      sps_temperture("Average Temperature: ",el.avgtempC,el.avgtempF),
      sps_temperture("Max Temperature: ",el.maxtempC,el.maxtempF),
      sps_temperture("Min Temperature: ",el.mintempC,el.mintempF),
    );
    secondary_card.append(card);
  })

  fh.main_display.append( primary_card , secondary_card );
  //switch temperature unit
  let classToChange = fh.display_on_fahrenheit ? [".fahrenheit",".celsius"] : [".celsius",".fahrenheit"];
  document.querySelectorAll(classToChange[1]).forEach(el=>{
    if(!el.classList.contains("hidden")) el.classList.add("hidden");
  });
  document.querySelectorAll(classToChange[0]).forEach(el=>el.classList.remove("hidden"));
}
//structure functions end///////////////////////////////////////
/////    init    ///////////////////////////
const fh = {previous_records:{},display_on_fahrenheit:true};
document.body.append(
  ce(header_str()),
  ce(main_str())
);