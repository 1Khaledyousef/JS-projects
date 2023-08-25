
let price = document.getElementById('price')
let texes = document.getElementById('texes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let submit = document.getElementById('submit')
let count = document.getElementById('count')
let category = document.getElementById('category')
let mood = 'create';

let title = document.getElementById('title')
let tmp;
const gettotal = () => {
    let result = price.value - texes.value - ads.value - discount.value
    if (price.value != '' && price.value > 0) {
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.style.background = 'red'
        total.innerHTML = '';
    }
}
let dataproduct;

if (localStorage.product != null) {
    dataproduct = JSON.parse(localStorage.product);
} else {
    dataproduct = [];
}

submit.onclick = () => {
    let newprod = {
        title: title.value.toLowerCase(),
        price: price.value ,
        texes: texes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value .toLowerCase(),
        count: count.value

    }

    //setInterval(()=>{dataproduct.push(newprod)},1000)
    localStorage.setItem('product', JSON.stringify(dataproduct));
    // setInterval(()=>{dataproduct.push(newprod)},500)
    if (mood === 'create') {
        if (newprod.count > 1) {
            for (let i = 1; i < newprod.count; i++) {
                dataproduct.push(newprod);
            }
        }
        else {
            dataproduct.push(newprod);

        }
    } else {
        dataproduct[tmp] = newprod;
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block';

    }

    cleardata();
    showdata();
}

const cleardata = () => {
    title.value = '';
    price.value = '';
    texes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    category.value = '';
    count.value = '';
}

const showdata = () => {
    let table = '';
    for (let i = 0; i < dataproduct.length; i++) {
        table += `
        <tr>
                        <td>${i + 1} </td>
                        <td>${dataproduct[i].title}</td>
                        <td>${dataproduct[i].price}</td>
                        <td>${dataproduct[i].texes}</td>
                        <td>${dataproduct[i].ads}</td>
                        <td>${dataproduct[i].discount}</td>
                        <td>${dataproduct[i].total}</td>
                        <td>${dataproduct[i].category}</td>
                        <td><button  id="update" onclick="dataUpdate(${i})">update</button></td>
                        <td><button onclick="deletedata(${i})"  id="edit">delete</button></td>
                    </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    let DeletAllBtn = document.getElementById('deletall')
    if (dataproduct.length > 0) {
        DeletAllBtn.innerHTML = `
        <button  onclick="ConfirmDelet( )   "  >Delete All (${dataproduct.length})</button>
        `
    } else {
        DeletAllBtn.innerHTML = '';
    }
}

const deletedata = (i) => {
    dataproduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataproduct);
    showdata();
}

const alldata = () => {

    localStorage.clear()
    dataproduct.splice(0);
    showdata();

}
const ConfirmDelet = () => {


    if (confirm("Are You sure??")) {
        alldata()
    } else {
        txt = "";
    }

}
// data update
function dataUpdate(i) {
    title.value = dataproduct[i].title;
    texes.value = dataproduct[i].texes;
    ads.value = dataproduct[i].ads;
    discount.value = dataproduct[i].discount;
    price.value = dataproduct[i].price;
    gettotal();
    category.value = dataproduct[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll(
        {
            top: 0,
            behavior: "smooth",
        }
    )
}



let searchMood = 'title';
const GetSearchMood = (id) => {
    let search = document.getElementById('search');
    if (id == 'searchbytitle') {
        searchMood = 'title'
        search.placeholder = 'searchby title'
    } else {
        searchMood = 'category'
        search.placeholder = 'searchby category'

    }
    search.focus()
    search.value=''
    showdata()
}
const searchdata = (value) => {
    table='';
    if (searchMood == 'title') {
        for (let i = 0; i < dataproduct.length; i++) {
            if (dataproduct[i].title.includes(value.toLowerCase())) {
                
                table += `
                <tr>
                                <td>${i + 1} </td>
                                <td>${dataproduct[i].title}</td>
                                <td>${dataproduct[i].price}</td>
                                <td>${dataproduct[i].texes}</td>
                                <td>${dataproduct[i].ads}</td>
                                <td>${dataproduct[i].discount}</td>
                                <td>${dataproduct[i].total}</td>
                                <td>${dataproduct[i].category}</td>
                                <td><button  id="update" onclick="dataUpdate(${i})">update</button></td>
                                <td><button onclick="deletedata(${i})"  id="edit">delete</button></td>
                            </tr>`
            }
 
        }
    }

    else {for (let i = 0; i < dataproduct.length; i++) {
        if (dataproduct[i].category.includes(value.toLowerCase())) {
            
            table += `
            <tr>
                            <td>${i + 1} </td>
                            <td>${dataproduct[i].title}</td>
                            <td>${dataproduct[i].price}</td>
                            <td>${dataproduct[i].texes}</td>
                            <td>${dataproduct[i].ads}</td>
                            <td>${dataproduct[i].discount}</td>
                            <td>${dataproduct[i].total}</td>
                            <td>${dataproduct[i].category}</td>
                            <td><button  id="update" onclick="dataUpdate(${i})">update</button></td>
                            <td><button onclick="deletedata(${i})"  id="edit">delete</button></td>
                        </tr>`
        }

    } }
    document.getElementById('tbody').innerHTML = table;

}