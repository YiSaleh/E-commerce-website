let productsInCart=[];
const xhr = new XMLHttpRequest();
xhr.open('GET',"https://afternoon-falls-30227.herokuapp.com/api/v1/products/");
xhr.send();
xhr.onload = ()=>{
    let products = JSON.parse(xhr.response);
    products=products.data;
    console.log(products[0]);
    const count = products.length;
    for(let i=0;i<count;i++)
    {  
        $("#main").append(`<div class='col col-md-3 my-5 mx-4' id='num${i}'></div>`);
        let imgg = document.createElement("img");
        let price = document.createElement("span");
        let name = document.createElement("p");
        let Btn =document.createElement('button');
        imgg.setAttribute("src",products[i].ProductPicUrl);
        name.textContent=products[i].Name ;
        price.textContent= products[i].Price+"$";
        $(`#num${i}`).append(name);
        $(`#num${i}`).append(imgg);
        $(`#num${i}`).append(price);
        $(`#num${i}`).append(Btn);
        $('span').css("padding-right","300px").css("padding-left","10px");
        $('button').attr("id",`${products[i].ProductId}`);
        $('button').attr("class",`btn btn-outline-info rounded-circle`);
        $(`#num${i} #${products[i].ProductId}`).append("<i class='fa fa-cart-plus'></i>");
        let x = $(`#num${i} #${products[i].ProductId}`);
        Btn.addEventListener('click',()=>
        {  addToCart(products[i].ProductId,1);
            if (products[i].Quantity >0) {
                products[i].Quantity--; 
            } else{
                x.attr('disabled',true);
            }
        }); 
    }   
    //styling of home page
    $("button").css("margin-bottom","30px");
    $("img").css("width","400px").css("padding","50px");
    $(`div .col`).css("background-color","#e9ecef");
    $("p").css("color","blue").css("font-weight","bold");
    $('span').css("color","red");
}
let number=0;
// function to add to cart products
function addToCart(id,q) {
    const xhr2  = new XMLHttpRequest();
    xhr2.open('GET','https://afternoon-falls-30227.herokuapp.com/api/v1/products/'+id);
    xhr2 .send();
    xhr2 .onload = ()=>
        { let res2=JSON.parse(xhr2.response);
            res2=res2.data;
            let product ={
                prodId:res2.ProductId,
                productName:res2.Name,
                amount:q,
                productPrice:res2.Price,
                productCat:res2.Category,
                supplierName:res2.SupplierName,
                photo:res2.ProductPicUrl
            }
            productsInCart.push(product);
            localStorage.setItem('product'+number, JSON.stringify(product));
            number++;
        }
}
// console.log(productsInCart);