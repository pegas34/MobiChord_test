app.controller('mainController', ['$scope', '$cookies', function($scope, $cookies) {
    $scope.cartCount      = 0;
    $scope.cartTotal      = 0;
    $scope.min            = 1;
    $scope.max            = 25;
    $scope.cartHeight     = {};
    $scope.classes        = {
        hide          : 'hide',
        show          : 'show',
        disabled      : 'disabled'
    };
    $scope.texts          = {
        textButtonOn  : 'Add to cart',
        textButtonOff : 'In cart'
    };
    $scope.cartShowClass  = $scope.classes.hide;

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
            cartTxt     : $scope.texts.textButtonOn,
            classButton : '',
            disabled    : false
        },
        {
            image       : 'img/moto1.jpg',
            name        : 'Moto Z Play with Style Mod (Black, 32GB)',
            infoList: [
                {info : '13.97 centimeters (5.5-inch) super AMOLED 1080p full HD Display'},
                {info : '2GHz Octa-Core Qualcomm Snapdragon processor'},
                {info : '3GB RAM, 32GB internal memory expandable up to 2TB'},
                {info : '3510 mAh all day battery with TurboPower charging'},
                {info : 'Android 6.0.1 Marshmallow'},
                {info : '16 MP dual autofocus camera with laser focus, 5 MP front camera'}
            ],
            price       : 428.5,
            shipping    : 12.98,
            left        : 5,
            cartTxt     : $scope.texts.textButtonOn,
            classButton : '',
            disabled    : false
        },
        {
            image       : 'img/xiaomi1.jpg',
            name        : 'Xiaomi Mi Max Prime (Gold, 128GB)',
            infoList: [
                {info : '16.35 centimeters (6.44-inch) IPS 2.5D glass capacitive touchscreen with 1920 x 1080 pixels resolution'},
                {info : '2GHz 64-bit Qualcomm Snapdragon core processor'},
                {info : '4GB RAM, 128GB internal memory'},
                {info : '4850 mAH lithium-polymer battery'},
                {info : 'Android 6.0.1 Marshmallow'},
                {info : '16MP primary camera and 5MP front facing camera'}
            ],
            price       : 314.25,
            shipping    : 12.98,
            left        : 15,
            cartTxt     : $scope.texts.textButtonOn,
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
            cartTxt     : $scope.texts.textButtonOn,
            classButton : '',
            disabled    : false
        },
        {
            image       : 'img/lenovo1.jpg',
            name        : 'Lenovo Z2 Plus (Black, 64GB)',
            infoList: [
                {info : '12.7 centimeters (5-inch) LTPS LCD capacitive touchscreen with 1920 x 1080 pixels resolution'},
                {info : '2.15Ghz Qualcomm Snapdragon 820, 4 custom Kryo cores'},
                {info : '4GB DDR4 RAM, 64GB SmartSLC internal memory'},
                {info : '3500mAh high density Li-Ion Battery'},
                {info : 'Android 6.0.1 Marshmallow'},
                {info : '13MP large pixel primary camera with Hybrid autofocus'}
            ],
            price       : 299.99,
            shipping    : 12.98,
            left        : 12,
            cartTxt     : $scope.texts.textButtonOn,
            classButton : '',
            disabled    : false
        }
    ];

    $scope.addToCart = function(index) {
        $scope.products[index].cartTxt     = $scope.texts.textButtonOff;
        $scope.products[index].classButton = $scope.classes.disabled;
        $scope.products[index].disabled    = true;
        $scope.products[index].left       -= 1;

        $scope.productsInCart.push($scope.addProductInCart(index));
        $scope.cartCount = $scope.productsInCart.length;
        $scope.cartTotal = $scope.cartTotalSum($scope.productsInCart);
        $scope.setCartHeight();
        $scope.setCartCookie(index);
    };

    $scope.addProductInCart = function(index, count) {
        var item          = {};
        count             = count || 1;

        item.index        = index;
        item.image        = $scope.products[index].image;
        item.name         = $scope.products[index].name;
        item.price        = $scope.products[index].price;
        item.shipping     = $scope.products[index].shipping;
        item.countProduct = count;
        if (count <= 1) {
            item.classMinus   = $scope.classes.disabled;
        } else {
            item.classMinus   = '';
        }
        if (count >= $scope.products[index].left) {
            item.classPlus    = $scope.classes.disabled;
        } else {
            item.classPlus   = '';
        }

        return item;
    };

    $scope.delCart = function(index) {
        var productIndex = $scope.productsInCart[index].index;

        $scope.products[productIndex].cartTxt     = $scope.texts.textButtonOn;
        $scope.products[productIndex].classButton = '';
        $scope.products[productIndex].disabled    = false;
        $scope.products[productIndex].left       += $scope.productsInCart[index].countProduct;

        $scope.productsInCart.splice(index, 1);
        $scope.cartCount = $scope.productsInCart.length;
        $scope.cartTotal = $scope.cartTotalSum($scope.productsInCart);
        if ($scope.cartCount == 0) {
            $scope.cartShowClass = $scope.classes.hide;
        }
        $scope.setCartHeight();
        $scope.removeCartCookie(productIndex);
    };

    $scope.countMinus = function(index) {
        var count = $scope.productsInCart[index].countProduct - 1,
            left  = $scope.products[$scope.productsInCart[index].index].left + 1;

        if (count < 1) {
            $scope.productsInCart[index].classMinus   = $scope.classes.disabled;
            count = $scope.productsInCart[index].countProduct;
        } else {
            $scope.products[$scope.productsInCart[index].index].left = left;
            $scope.productsInCart[index].countProduct = count;
            $scope.productsInCart[index].classPlus    = '';
            if (count <= 1) {
                $scope.productsInCart[index].classMinus    = $scope.classes.disabled;
            }
        }

        $scope.cartTotal = $scope.cartTotalSum($scope.productsInCart);
        $scope.setCartCookie($scope.productsInCart[index].index, count);
    };

    $scope.countPlus = function(index) {
        var count = $scope.productsInCart[index].countProduct + 1,
            left  = $scope.products[$scope.productsInCart[index].index].left - 1;

        if (left < 0) {
            $scope.productsInCart[index].classPlus    = $scope.classes.disabled;
            count = $scope.productsInCart[index].countProduct;
        } else {
            $scope.products[$scope.productsInCart[index].index].left = left;
            $scope.productsInCart[index].countProduct = count;
            $scope.productsInCart[index].classMinus   = '';
            if (left <= 0) {
                $scope.productsInCart[index].classPlus    = $scope.classes.disabled;
            }
        }

        $scope.cartTotal = $scope.cartTotalSum($scope.productsInCart);
        $scope.setCartCookie($scope.productsInCart[index].index, count);
    };

    $scope.search = function(product) {
        var productInfoList = $scope.arrayObjectToString(product.infoList);

        if (!$scope.searchInput || product.name.indexOf($scope.searchInput) != -1 || productInfoList.indexOf($scope.searchInput) != -1) {
            return true;
        }

        return false;
    };

    $scope.openCart = function() {
        if ($scope.cartShowClass == $scope.classes.hide && $scope.productsInCart.length > 0) {
            $scope.cartShowClass = $scope.classes.show;
            $scope.setCartHeight();
        } else {
            $scope.cartShowClass = $scope.classes.hide;
        }
        $scope.cartTotal = $scope.cartTotalSum($scope.productsInCart);
    };

    $scope.setCartHeight = function() {
        var heightWindow = window.innerHeight - 90,
            heightCart   = 103 * $scope.productsInCart.length + 45;
        if (heightCart > heightWindow) {
            $scope.cartHeight = {'height' : heightWindow + 'px'};
        } else {
            $scope.cartHeight = {};
        }
    };

    $scope.arrayObjectToString = function (array) {
        var itemString = '';

        for (var i = 0; i < array.length; i++) {
            itemString += array[i].info.toString() + ' ';
        }

        return itemString;
    };

    $scope.cartTotalSum = function(array) {
        var sum = 0;

        for (var i = 0; i < array.length; i++) {
            sum += array[i].price * array[i].countProduct + array[i].shipping;
        }

        return sum;
    };

    $scope.setCartCookie = function(index, count) {
        count = count || 1;
        $cookies.put(index, count);
    };

    $scope.removeCartCookie = function(index) {
        $cookies.remove(index);
    };

    $scope.setProductsInCart = function() {
        var array = [];

        for(var i=0; i < $scope.products.length; i++) {
            if (typeof($cookies.get(i)) != 'undefined') {
                var count = parseInt($cookies.get(i));

                array.push($scope.addProductInCart(i, count));
                $scope.products[i].classButton = $scope.classes.disabled;
                $scope.products[i].cartTxt     = $scope.texts.textButtonOff;
                $scope.products[i].left       -= count;
                $scope.cartCount              += 1;
            }
        }

        return array;
    };
    $scope.productsInCart = $scope.setProductsInCart();

}]);
