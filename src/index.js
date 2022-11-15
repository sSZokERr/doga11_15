async function updateJson() {
    let res = await fetch("../quotes.json");
        return await res.json();
}

document.addEventListener('DOMContentLoaded', async () => {
    let all = document.getElementById('all');
    let the = document.getElementById('the');
    let counted = document.getElementById('counted');
    let length = document.getElementById('length');
    let author = document.getElementById('author');


    all.addEventListener('click', async()=>{
        let data = await updateJson();
        let abc = data.quotes.sort((a, b) => {
            if(a.author < b.author){return -1}
            else if(a.author > b.author){return 1}
            else{return 0}
        });
        let list = document.getElementById("result");
            for (let a of abc) {
              let li = document.createElement("li");
              li.innerHTML = a.id + "<br>" + a.quote + "<br>" + a.author;
              list.appendChild(li);
            };

    });

    the.addEventListener('click', async () => {
        let array = [];
        let data = await updateJson();
        let filter = data.quotes.filter((a) => a.quote.includes("the") || a.quote.includes("The"));
        for (let f of filter) {
          let line = f.quote + "\n\t-" + f.author;
          line = line.replaceAll("The", "<b>The</b>");
          line = line.replaceAll("the", "<b>the</b>");
          array.push(line);
        }
        let list = document.getElementById("resultOl");
        for (let a of array) {
          let li = document.createElement("li");
          li.innerHTML = a;
          list.appendChild(li);
        }
      });
    length.addEventListener('click', async () => {
        let array = [];
        let data = await updateJson();
        let abc = data.quotes.sort((a, b) => {
            if(a.author < b.author){return -1}
            else if(a.author > b.author){return 1}
            else{return 0}
        });
        for (let a of abc){
            let len = a.quote.length;
            array.push(len  + ' ' + a.quote);
        }
        let list = document.getElementById("resultOut");
        for (let a of array) {
            let li = document.createElement("li");
            li.innerHTML = a;
            list.appendChild(li);
          }
    })

   
    author.addEventListener('change', async () => {
        let data = await updateJson();
        let input = author.value;
        let filter = data.quotes.filter((d) => d.author.includes(input));
        console.log(filter);
        let count = filter.length
        document.getElementById("counted").setAttribute('value',count);

    })

    
});
    
