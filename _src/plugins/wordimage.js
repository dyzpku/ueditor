///import core
///commands 本地图片引导上传
///commandsName  WordImage
///commandsTitle  本地图片引导上传
///commandsDialog  dialogs\wordimage

UE.plugin.register('wordimage',function(){
    var me = this,
        images = [];
    return {
        commands : {
            'wordimage':{
                execCommand:function () {
                    var images = domUtils.getElementsByTagName(me.body, "img");
                    var urlList = [];
                    for (var i = 0, ci; ci = images[i++];) {
                        var url = ci.getAttribute("word_img");
                        url && urlList.push(url);
                    }
                    return urlList;
                },
                queryCommandState:function () {
                    images = domUtils.getElementsByTagName(me.body, "img");
                    for (var i = 0, ci; ci = images[i++];) {
                        if (ci.getAttribute("word_img")) {
                            return 1;
                        }
                    }
                    return -1;
                },
                notNeedUndo:true
            }
        },
        inputRule : function (root) {
            utils.each(root.getNodesByTagName('img'), function (img) {
                var attrs = img.attrs;
                if (attrs['src'] && /^(?:(file:\/+))/.test(attrs['src'])) {
                    img.setAttr({
                        word_img: attrs.src
                    })
                }
            })
        }
    }
});