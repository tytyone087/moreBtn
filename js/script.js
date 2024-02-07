const $container=$('.gallery');
const $loadMoreBtn=$('.load-more');
let $added=0;
let $addItemCount=8;
let $allData=[];

$container.masonry({
    // options
    itemSelector: '.gallery-item',
    columnWidth: 210,
    gutter:30
  });

$.getJSON('./data/content.json', function(data){
    $allData=data;
    //console.log($allData)
    addItem()
   $loadMoreBtn.click(addItem)
})


function addItem(){
    let elements=[];
    let slideData;
    slideData=$allData.slice($added, $added+$addItemCount);
    console.log(slideData)
    $.each(slideData, function(index, item){
        let itemHTML=`
        <li class="gallery-item">
            <a href="${item.images.large}">
                <figure>
                    <img src="${item.images.thumb}" alt="${item.title}">
                    <figcaption>${item.title}</figcaption>
                </figure>
            </a>
        </li>
        `
        elements.push($(itemHTML).get(0));
    })
    $container.append(elements);
    $added += slideData.length;

    if($added <$allData.length){
        $loadMoreBtn.show();
    }else{
        $loadMoreBtn.hide();
    }
    
    $container.imagesLoaded( function() {
        $container.masonry('appended',elements)
      });
}
