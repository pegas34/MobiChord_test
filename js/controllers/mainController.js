app.controller('mainController', function($scope) {
    $scope.productsInCard = [];
    $scope.cartCount      = 0;
    $scope.cartTotal      = 0;
    $scope.min            = 1;
    $scope.max            = 25;
    $scope.disabled       = 'disabled';
    $scope.cartShowClass  = 'hide';
    $scope.cartHeight     = {};

    $scope.products       = [
        {
            image       : 'img/iphone1.jpg',
            name        : 'Apple IPhone 5S 16GB (Space Gray)',
            infoList    : [
                {info : '4-inch Retina display'},
                {info : 'A7 chip with M2 motion compressor'},
                {info : 'Touch ID fingerprint sensor'},
                {info : 'New 8MP iSight camera with True Tone flash and 1080p HD video recording'}
            ],
            price       : 680.99,
            shipping    : 12.99,
            left        : 9,
            cardTxt     : 'Add to cart',
            classButton : '',
            disabled    : false
        },
        {
            image       : 'img/moto1.jpg',
            name        : 'Moto Z Play with Style Mod (Black, 32GB)',
            infoList: [
                {info : '13.97 centimeters (5.5-inch) super AMOLED 1080p full HD Display'},
                {info : '2 GHz Octa-Core Qualcomm Snapdragon processor'},
                {info : '3GB RAM, 32GB internal memory expandable up to 2TB'},
                {info : '3510 mAh all day battery with TurboPower charging'},
                {info : 'Android 6.0.1 Marshmallow'},
                {info : '16 MP dual autofocus camera with laser focus, 5 MP front camera'}
            ],
            price       : 428.5,
            shipping    : 12.98,
            left        : 11,
            cardTxt     : 'Add to cart',
            classButton : '',
            disabled    : false
        },
        {
            image       : 'img/xiaomi1.jpg',
            name        : 'Xiaomi Mi Max Prime (Gold, 128GB)',
            infoList: [
                {info : '16.35 centimeters (6.44-inch) IPS 2.5D glass capacitive touchscreen with 1920 x 1080 pixels resolution'},
                {info : '64-bit Qualcomm Snapdragon core processor'},
                {info : '4GB RAM, 128GB internal memory'},
                {info : '4850 mAH lithium-polymer battery'},
                {info : 'Android 6.0.1 Marshmallow OS with MIUI 8'},
                {info : '16MP primary camera and 5MP front facing camera'}
            ],
            price       : 314.25,
            shipping    : 12.98,
            left        : 15,
            cardTxt     : 'Add to cart',
            classButton : '',
            disabled    : false
        },
        {
            image       : 'img/iphone2.jpg',
            name        : 'Apple IPhone 5S 16GB (White)',
            infoList: [
                {info : '4-inch Retina display'},
                {info : 'A7 chip with M2 motion compressor'},
                {info : 'Touch ID fingerprint sensor'},
                {info : 'New 8MP iSight camera with True Tone flash and 1080p HD video recording'}
            ],
            price       : 685.99,
            shipping    : 12.98,
            left        : 3,
            cardTxt     : 'Add to cart',
            classButton : '',
            disabled    : false
        }
    ];

    $scope.addCard = function(index) {
        $scope.products[index].cardTxt     = 'In card';
        $scope.products[index].classButton = $scope.disabled;
        $scope.products[index].disabled    = true;
        $scope.products[index].left       -= 1;

        $scope.addProductInCard(index);
        $scope.cartCount = $scope.productsInCard.length;
        $scope.cartTotal = cartTotalSum($scope.productsInCard);
    };

    $scope.addProductInCard = function(index) {
        var item          = {};

        item.index        = index;
        item.image        = $scope.products[index].image;
        item.name         = $scope.products[index].name;
        item.price        = $scope.products[index].price;
        item.shipping     = $scope.products[index].shipping;
        item.countProduct = 1;
        item.classMinus   = $scope.disabled;
        item.classPlus    = '';

        $scope.productsInCard.push(item);
        setCardHeight();
    };

    $scope.delCard = function(index) {
        var productIndex = $scope.productsInCard[index].index;

        $scope.products[productIndex].cardTxt     = 'Add to cart';
        $scope.products[productIndex].classButton = '';
        $scope.products[productIndex].disabled    = false;
        $scope.products[productIndex].left       += 1;

        $scope.productsInCard.splice(index, 1);
        $scope.cartCount = $scope.productsInCard.length;
        $scope.cartTotal = cartTotalSum($scope.productsInCard);
        if ($scope.cartCount == 0) {
            $scope.cartShowClass = 'hide';
        }
        setCardHeight();
    };

    $scope.countMinus = function(index) {
        var count = $scope.productsInCard[index].countProduct -= 1;

        if (count <= $scope.min) {
            $scope.productsInCard[index].countProduct = $scope.min;
            $scope.productsInCard[index].classMinus   = $scope.disabled;
        } else {
            $scope.productsInCard[index].countProduct = count;
            $scope.productsInCard[index].classPlus    = '';
        }
        $scope.cartTotal = cartTotalSum($scope.productsInCard);
    };

    $scope.countPlus = function(index) {
        var count = $scope.productsInCard[index].countProduct += 1;

        if (count >= $scope.max) {
            $scope.productsInCard[index].countProduct = $scope.max;
            $scope.productsInCard[index].classPlus    = $scope.disabled;
        } else {
            $scope.productsInCard[index].countProduct = count;
            $scope.productsInCard[index].classMinus   = '';
        }
        $scope.cartTotal = cartTotalSum($scope.productsInCard);
    };

    $scope.search = function(product) {
        var productInfoList = arrayObjectToString(product.infoList);

        if (!$scope.searchInput || product.name.indexOf($scope.searchInput) != -1 || productInfoList.indexOf($scope.searchInput) != -1) {
            return true;
        }

        return false;
    };

    $scope.openCard = function() {
        if ($scope.cartShowClass == 'hide' && $scope.productsInCard.length > 0) {
            $scope.cartShowClass = 'show';
            setCardHeight();
        } else {
            $scope.cartShowClass = 'hide';
        }
    };

    var setCardHeight = function() {
        var heightWindow = window.innerHeight - 90,
            heightCard   = 103 * $scope.productsInCard.length + 70;
        if (heightCard > heightWindow) {
            $scope.cartHeight = {'height' : heightWindow + 'px'};
        } else {
            $scope.cartHeight = {};
        }
    };

    var arrayObjectToString = function (array) {
        var itemString = '';

        for (var i = 0; i < array.length; i++) {
            itemString += array[i].info.toString() + ' ';
        }

        return itemString;
    };

    var cartTotalSum = function(array) {
        var sum = 0;

        for (var i = 0; i < array.length; i++) {
            sum += array[i].price * array[i].countProduct + array[i].shipping;
        }

        return sum;
    };
});
