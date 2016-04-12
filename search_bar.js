function clickdroplist() {
   var line = document.getElementById("droplist");
   var electorate = line.options[line.selectedIndex].text;
   electorate=electorate.replace(/^.*\:/, '');
   addCard(electorate);
}

var dropdown = function(list) { 
    var sel = document.getElementById("droplist");

    var length = sel.options.length;
        for (i = 0; i < length; i++) {
         sel.remove(sel.selectedIndex);
        }
    for (var i = 0; i < list[1].length; i++) {
        var Entry = document.createElement("option");
        Entry.text = list[0][i].concat(':',list[1][i]);

        sel.add(Entry,i+1);
        }
}    
function Search() {
    var t = document.getElementById('searchtxt').value;
    var c = searchfunct(String(t));
    dropdown(c);
}
   


function searchfunct(term) {
   
    var postcode = String(term).match(/[0-9]{3,4}/);
    var text = String(term).match(/[A-Za-z]+.*/);
    var result = new Array;
    var suburb = new Array;
    var list = [suburb,result];

    if(!(typeof(postcode)=='undefined'||postcode==null)) {
        var regex = new RegExp("\\b"+postcode);    
        for (var x in PEMap) {
             if (regex.test(x)) {
                list[1]=list[1].concat(PEMap[x]);
                list[0].push(x);
              }
        }
    }

    if(!(typeof(text)=='undefined'||text==null)) {
        regex = new RegExp("\\b"+text,"i");
        for (var x in EMap) {
            if (regex.test(x)) {
                list[1].push(x);
                list[0].push("Electorate");
            }
        }

        for(i=0;i<result.length;i++) {
        }

        for (x in SEMap) {
            if (regex.test(x)) {
                list[1] = list[1].concat(SEMap[x]);
                for (y=0;y<SEMap[x].length;y++) {
                    list[0].push(x);
                }
            }
            if (list[1].length > 19) { break; } // arbitary list length limit
        }        
   }
   return list;
}  