const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const COLOR_BG_BLOCK1 = 0x121212;
const COLOR_BG_BLOCK2 = 0x040404;
const COLOR_HEADER = 0x4b4b4b;
const COLOR_TEXT_HEADER = 0xfbfbfb;
const COLOT_TEXT_GUN = 0x484848;
const height_block = HEIGHT / 3.8;
const LEVEL_2_GUN = 1; // 1 - AK47, 2 - Navy MachinGun, 3 - L-94
const timeOpenLoadingWindow = 5000;
let Conteiner;
let MONEY = 0;
let containerTextCoinAk47;
let conteinerTextCoinColt;
let bgColorRed = 0xFF0000;
let conteinerTargetColt_1 = new PIXI.Container();
let conteinerTargetAk47_1 = new PIXI.Container();
let isActiveFireMod = false;
let conteinerImgLvl = new PIXI.Container();
let isAnimLvlTwo = false;
let isAnimHelp = false;
let isAnimHelp2 = false;
let stopAllAnim = false;
let isAnimHelpAk47 = true;
let isVisibleAk47 = false;
let isAnimAk47 = false; // fix false
let isAnimColt1911 = false;


let graphicsTextLvl;
let textLvlOpen;
let headerGraphics;

function CreateBg(color1, color2) {
    let h = HEIGHT - height_block;
    for (let i = 1; i < 5; i++) {
        let containerLevel = new PIXI.Container();
        let bg = new PIXI.Sprite(PIXI.Texture.WHITE);
        bg.width = WIDTH;
        bg.height = height_block;
        bg.tint = color2;

        if (i % 2 == 1) {
            bg.tint = color1;
        }
        containerLevel.addChild(bg);
        containerLevel.x = 0;
        containerLevel.y = h;
        Conteiner.addChild(containerLevel);
        h -= containerLevel.height;
    }
}

let contFireModBg;
function CreateFireModBg() {
    contFireModBg = new PIXI.Container();
    Conteiner.addChild(contFireModBg);

    let fireModBggraphics = new PIXI.Graphics();
    fireModBggraphics.beginFill(bgColorRed, 0.1);
    fireModBggraphics.drawRect(0, 0, WIDTH, HEIGHT);
    fireModBggraphics.endFill();

    contFireModBg.addChild(fireModBggraphics);

    contFireModBg.alpha = 0;
}

let positionDispl = () => {
    if (WIDTH / HEIGHT < 1) return 1;
    else return 0;
}

function TextLvl(text, x, y) {
    Conteiner.addChild(conteinerImgLvl);
    graphicsTextLvl = new PIXI.Graphics();
    conteinerImgLvl.addChild(graphicsTextLvl);

    let bulletTexture = PIXI.Texture.from(imgUnlockLvl);
    lvlSprite = new PIXI.Sprite(bulletTexture);
    lvlSprite.scale.x = lvlSprite.scale.y = 0.3;
    lvlSprite.x = x;
    lvlSprite.y = y;
    conteinerImgLvl.addChild(lvlSprite);

    let style = new PIXI.TextStyle();
    style.fontSize = 28;
    style.fill = "0xfbfbfb";

    textLvlOpen = new PIXI.Text(text, style);
    textLvlOpen.x = x;
    textLvlOpen.y = y;

    textLvlOpen.scale.x = 0.5;
    textLvlOpen.scale.y = 0.5;

    lvlSprite.x = textLvlOpen.x - textLvlOpen.width / 2;

    graphicsTextLvl.beginFill(0x47cfab);
    graphicsTextLvl.moveTo(x - textLvlOpen.width / 2 - textLvlOpen.width / 10, y - textLvlOpen.height / 5);
    graphicsTextLvl.lineTo(x - textLvlOpen.width / 2 - textLvlOpen.width / 10, y + (textLvlOpen.height + textLvlOpen.height / 5 * 2));
    graphicsTextLvl.lineTo(x + textLvlOpen.width / 2 + textLvlOpen.width / 2, y + (textLvlOpen.height + textLvlOpen.height / 5 * 2));
    graphicsTextLvl.lineTo(x + textLvlOpen.width / 2 + textLvlOpen.width / 2, y - textLvlOpen.height / 5);
    graphicsTextLvl.endFill();
    graphicsTextLvl.alpha = 0;


    conteinerImgLvl.addChild(textLvlOpen);

    let helperLvl = PIXI.Texture.from(helperHend);

    helperLvlSprite = new PIXI.Sprite(helperLvl);
    if (positionDispl() === 0) helperLvlSprite.scale.x = helperLvlSprite.scale.y = 0.3;
    else helperLvlSprite.scale.x = helperLvlSprite.scale.y = 0.7;
    helperLvlSprite.x = x;
    helperLvlSprite.y = y + 20;
    helperLvlSprite.alpha = 0;

    // graphicsTextLvl.interactive = true;
    graphicsTextLvl.on("mousedown", clickNewLvl);
    graphicsTextLvl.on("touchend", clickNewLvl);

    conteinerImgLvl.addChild(helperLvlSprite);

    conteinerImgLvl.x = -(textLvlOpen.width / 4)
    conteinerImgLvl.y = - (textLvlOpen.height / 2);

}
clickNewLvl = () => {
    isAnimHelp2 = false;
    isCirclesAnim2 = false;

    conteinerCircle2.removeChildren(0)

    conteinerImgLvl.children[0].alpha = 0;
    conteinerImgLvl.children[1].alpha = 0;
    conteinerImgLvl.children[2].alpha = 0;
    conteinerImgLvl.children[3].alpha = 0;

    activeBlockAK47();
};

openNewLevel = () => {
    isAnimLvlTwo = true;
    conteinerImgLvl.children[0].alpha = 1;
    conteinerImgLvl.children[3].alpha = 1;

    conteinerImgLvl.children[2].text = MONEY + '$'
    isAnimHelp2 = true;
    isCirclesAnim2 = true;
};

activeBlockAK47 = () => {
    conteinerAk47.alpha = 1;
    textAk12.alpha = 1;
    conteinerTargetAk47.alpha = 1;
    conteinerHelperAk47.alpha = 1;
    conteinerAk47.interactive = true;
    isVisibleAk47 = true;
    MONEY -= 100;
    basicText.text = "$" + MONEY;
}

let basicText;
function CreateHeader() {

    createFon = () => {
        headerGraphics = new PIXI.Container();
        Conteiner.addChild(headerGraphics);

        let graphics = new PIXI.Graphics();
        graphics.beginFill(COLOR_HEADER);

        graphics.moveTo(0, 0);
        graphics.lineTo(0, 0 + HEIGHT / 10 - HEIGHT / 30);
        graphics.lineTo(0 + WIDTH / 3.1, 0 + HEIGHT / 10 - HEIGHT / 30);
        graphics.lineTo(0 + WIDTH / 3.1), (0 + HEIGHT / 10 - HEIGHT / 30);
        graphics.lineTo(0 + WIDTH / 2.5, 0 + HEIGHT / 10);
        graphics.lineTo(WIDTH - WIDTH / 2.5, 0 + HEIGHT / 10);
        graphics.lineTo(WIDTH - WIDTH / 3.1, 0 + HEIGHT / 10 - HEIGHT / 30);
        graphics.lineTo(WIDTH, 0 + HEIGHT / 10 - HEIGHT / 30);
        graphics.lineTo(WIDTH, 0);

        graphics.endFill();

        headerGraphics.addChild(graphics);
    };

    createText = () => {
        let style = new PIXI.TextStyle();
        style.fontSize = 28;
        style.fill = COLOR_TEXT_HEADER;

        basicText = new PIXI.Text("$" + MONEY, style);
        basicText.x = WIDTH / 2 - basicText.width / 2;
        basicText.y = ((HEIGHT / 2) / 8) / 2 - basicText.height / 2;
        //fix text

        headerGraphics.addChild(basicText);
    };
    createFon();
    createText();
};

let intervalAnimColt;
let intervalAnimAk;
let positionGun2;
let timeAutoShot = 1000;
let contTapToPlay;
let graphicsTapToPlay;
let textTapToPlay;
let textColt1911;
let textAk12;
let conteinerAk47;
let conteinerColt1911;

function CreateGun(sprite1, sprite2, fireSprite, alphaGun, alphaFire, xCont, yCont, xSprite, ySprite, num) {
    if (num === 1) {
        conteinerColt1911 = new PIXI.Container();
        Conteiner.addChild(conteinerColt1911);

        conteinerColt1911.x = WIDTH / 6.5;
        conteinerColt1911.y = HEIGHT - height_block / 2 + height_block / 6;

        conteinerColt1911.pivot.x = 25;
        conteinerColt1911.pivot.y = 50;

        conteinerColt1911.interactive = true;
        conteinerColt1911.on("mousedown", clickGun1);
        conteinerColt1911.on("touchend", clickGun1);

        let style = new PIXI.TextStyle();
        style.fontSize = 12;
        style.fill = COLOT_TEXT_GUN;

        textColt1911 = new PIXI.Text("Colt 1911", style);
        textColt1911.x = 10;
        textColt1911.y = HEIGHT - HEIGHT / 4 + 10;

        Conteiner.addChild(textColt1911);

        sprite1.x = sprite2.x = 0;
        sprite1.y = sprite2.y = 0;
        fireSprite.x = 65;
        fireSprite.y = -15;

        sprite2.scale.x = sprite2.scale.y = 0.3;
        fireSprite.scale.x = fireSprite.scale.y = 0.3;
        sprite1.scale.x = sprite1.scale.y = 0.3;

        sprite1.alpha = alphaGun;
        sprite2.alpha = alphaGun;
        fireSprite.alpha = alphaFire;

        conteinerColt1911.addChild(sprite1);
        conteinerColt1911.addChild(sprite2);
        conteinerColt1911.addChild(fireSprite);
    }

    if (num === 2) {
        conteinerAk47 = new PIXI.Container();
        Conteiner.addChild(conteinerAk47);

        conteinerAk47.x = WIDTH / 6.5;
        conteinerAk47.y = conteinerColt1911.y - height_block;

        conteinerAk47.pivot.x = 25;
        conteinerAk47.pivot.y = 50;

        conteinerAk47.on("mousedown", clickGun2);
        conteinerAk47.on("touchend", clickGun2);

        let style = new PIXI.TextStyle();
        style.fontSize = 12;
        style.fill = COLOT_TEXT_GUN;

        if (LEVEL_2_GUN === 1) {
            textAk12 = new PIXI.Text("AK-12", style);
            sprite2.x = 105;
            sprite2.y = 26;
            sprite2.scale.x = sprite2.scale.y = 0.3;
            sprite2.alpha = alphaGun;
        }
        if (LEVEL_2_GUN === 2) {
            textAk12 = new PIXI.Text("MachinGun", style);
        }
        if (LEVEL_2_GUN === 3) {
            textAk12 = new PIXI.Text("L-94", style);

        }
        fireSprite.scale.x = fireSprite.scale.y = 0.3;
        sprite1.scale.x = sprite1.scale.y = 0.3;
        fireSprite.x = 125;
        textAk12.x = 10;
        textAk12.y = HEIGHT - height_block * 2 + 10;
        textAk12.alpha = 0;
        sprite1.alpha = alphaGun;
        fireSprite.alpha = alphaFire;


        if (LEVEL_2_GUN === 1) {
            conteinerAk47.addChild(sprite1);
            conteinerAk47.addChild(sprite2);
            conteinerAk47.addChild(fireSprite);
        }
        if (LEVEL_2_GUN === 2 || LEVEL_2_GUN === 3) {
            conteinerAk47.addChild(sprite1);
            conteinerAk47.addChild(fireSprite);
        }

        Conteiner.addChild(textAk12);
        conteinerAk47.alpha = 0;

    }

};
clickGun1 = () => {
    isAnimHelp = false;
    isCirclesAnim = false;

    conteinerHelper.removeChildren(0);
    conteinerCircle.removeChildren(0);

    isAnimColt1911 = true;
    clearInterval(intervalAnimColt);

    autoAnim = false;

    graphicsTapToPlay.clear();
    textTapToPlay.text = '';
};
clickGun2 = () => {
    isAnimHelpAk47 = false;
    isCirclesAnimAk47 = false;

    conteinerHelperAk47.alpha = 0;
    conteinerHelperAk47.removeChildren(0);
    conteinerCircleAk47.removeChildren(0);

    isAnimAk47 = true;
    clearInterval(intervalAnimAk);
    autoAnimAk47 = false;
};


let targetSpriteAk47;
let target;
let conteinerHole;
let conteinerHoleAk47;

function CreateTarget(num) {
    if (num === 1) {
        conteinerTarget = new PIXI.Container();
        Conteiner.addChild(conteinerTarget);
        conteinerTarget.addChild(conteinerTargetColt_1);
        conteinerTarget2 = new PIXI.Container();
        conteinerTarget.addChild(conteinerTarget2);

        let target = PIXI.Texture.from(imgTarget);

        targetSprite = new PIXI.Sprite(target);

        targetSprite2 = new PIXI.Sprite(target);
        targetSprite2.x = targetSprite.x + 47;
        targetSprite2.scale.x = targetSprite2.scale.y = 0.5;
        targetSprite.scale.x = targetSprite.scale.y = 0.5;

        conteinerTargetColt_1.x = conteinerTarget2.x = WIDTH - WIDTH / 5.5;
        conteinerTargetColt_1.y = conteinerTarget2.y = conteinerColt1911.y - conteinerColt1911.pivot.y - 15;

        conteinerTargetColt_1.addChild(targetSprite);
        conteinerTarget2.addChild(targetSprite2);

        conteinerHole = new PIXI.Container();
        conteinerTargetColt_1.addChild(conteinerHole);
    }
    if (num === 2) {
        conteinerTargetAk47 = new PIXI.Container();
        Conteiner.addChild(conteinerTargetAk47);
        conteinerTargetAk47.addChild(conteinerTargetAk47_1);
        conteinerTargetAk472 = new PIXI.Container();
        conteinerTargetAk47.addChild(conteinerTargetAk472);

        target = PIXI.Texture.from(imgTarget);
        target2 = PIXI.Texture.from(imgTarget2);

        targetSpriteAk47 = new PIXI.Sprite(target2);

        targetSpriteAk472 = new PIXI.Sprite(target);
        targetSpriteAk472.x = targetSprite.x + 47;

        targetSpriteAk472.scale.x = targetSpriteAk472.scale.y = 0.5;
        targetSpriteAk47.scale.x = targetSpriteAk47.scale.y = 0.5;

        conteinerTargetAk47_1.x = conteinerTargetAk472.x = WIDTH - WIDTH / 5.5;

        conteinerTargetAk47_1.y = conteinerTargetAk472.y = conteinerAk47.y - conteinerAk47.pivot.y - 15;

        conteinerTargetAk47_1.addChild(targetSpriteAk47);
        conteinerTargetAk472.addChild(targetSpriteAk472);

        conteinerHoleAk47 = new PIXI.Container();
        conteinerTargetAk47_1.addChild(conteinerHoleAk47);

        conteinerTargetAk47.alpha = 0;
    }

};

let conteinerHelper;
let helperSprite;
let conteinerHelperAk47;
let helperSpriteAk47;

function Helper(num) {
    if (num === 1) {
        conteinerHelper = new PIXI.Container();
        conteinerColt1911.addChild(conteinerHelper);

        let helperTexture = PIXI.Texture.from(helperHend);

        helperSprite = new PIXI.Sprite(helperTexture);

        helperSprite.scale.x = helperSprite.scale.y = 0.7;

        conteinerHelper.x = 40;
        conteinerHelper.y = 25;
        conteinerHelper.addChild(helperSprite);
    }
    if (num === 2) {
        conteinerHelperAk47 = new PIXI.Container();
        conteinerAk47.addChild(conteinerHelperAk47);

        let helperTextureAk47 = PIXI.Texture.from(helperHend);

        helperSpriteAk47 = new PIXI.Sprite(helperTextureAk47);

        helperSpriteAk47.scale.x = helperSpriteAk47.scale.y = 0.7;

        conteinerHelperAk47.x = 40;
        conteinerHelperAk47.y = 25;
        conteinerHelperAk47.addChild(helperSpriteAk47);

        conteinerHelperAk47.alpha = 0;
    }
}

let bulletTextureGun2;
let conteinerBullet;
let bulletSprite;
let conteinerBulletAk47;
let bulletSpriteAk47;

function Bullet(numberBlockBullet) {

    if (numberBlockBullet === 1) {
        conteinerBullet = new PIXI.Container();
        Conteiner.addChild(conteinerBullet);

        let bulletTextureGun1 = PIXI.Texture.from(imgBullet);
        bulletSprite = new PIXI.Sprite(bulletTextureGun1);

        bulletSprite.scale.x = bulletSprite.scale.y = 0.1;
        bulletSprite.alpha = 0;

        if (positionDispl() === 0) {
            conteinerBullet.x = WIDTH / 2 - WIDTH / 4 + conteinerColt1911.width / 2;
        } else {
            conteinerBullet.x = sptiteFire.x + 50;
        }
        conteinerBullet.y = conteinerColt1911.y - conteinerColt1911.pivot.y;
        conteinerBullet.addChild(bulletSprite);
    }
    if (numberBlockBullet === 2) {
        conteinerBulletAk47 = new PIXI.Container();
        Conteiner.addChild(conteinerBulletAk47);

        bulletTextureGun2 = PIXI.Texture.from(imgBullet);
        bulletSpriteAk47 = new PIXI.Sprite(bulletTextureGun2);

        bulletSpriteAk47.scale.x = bulletSpriteAk47.scale.y = 0.1;
        bulletSpriteAk47.alpha = 0;
        conteinerBulletAk47.x = conteinerAk47.x + conteinerAk47.width;
        conteinerBulletAk47.y = conteinerAk47.y - conteinerAk47.height - 10;
        conteinerBulletAk47.addChild(bulletSpriteAk47);
    }
}

function TargetBlast(num) {
    if (num === 1) {
        conteinerTargetBlast = new PIXI.Container();
        Conteiner.addChild(conteinerTargetBlast);

        let targetBlastTexture1 = PIXI.Texture.from(imgLayer5);
        let targetBlastTexture2 = PIXI.Texture.from(imgLayer7);
        let targetBlastTexture3 = PIXI.Texture.from(imgLayer8);
        let targetBlastTexture4 = PIXI.Texture.from(imgLayer9);

        targetBlastSprite1 = new PIXI.Sprite(targetBlastTexture1);
        targetBlastSprite2 = new PIXI.Sprite(targetBlastTexture2);
        targetBlastSprite3 = new PIXI.Sprite(targetBlastTexture3);
        targetBlastSprite4 = new PIXI.Sprite(targetBlastTexture4);

        targetBlastSprite1.scale.x = targetBlastSprite1.scale.y = 0.5;
        targetBlastSprite2.scale.x = targetBlastSprite2.scale.y = 0.5;
        targetBlastSprite3.scale.x = targetBlastSprite3.scale.y = 0.5;
        targetBlastSprite4.scale.x = targetBlastSprite4.scale.y = 0.5;
        // targetBlastSprite.alpha = 1;
        targetBlastSprite2.x = 10;
        targetBlastSprite2.y = -5;

        targetBlastSprite3.x = 20;
        targetBlastSprite3.y = 22;

        targetBlastSprite4.x = 3;
        targetBlastSprite4.y = 33;

        if (positionDispl() === 0) {
            conteinerTargetBlast.x = WIDTH - WIDTH / 4;
            conteinerTargetBlast.y = conteinerColt1911.y - conteinerColt1911.pivot.y + 10;
        }
        else {
            conteinerTargetBlast.x = WIDTH - WIDTH / 5.5;
            conteinerTargetBlast.y = conteinerColt1911.y - conteinerColt1911.pivot.y - 15;
        }

        conteinerTargetBlast.addChild(targetBlastSprite1);
        conteinerTargetBlast.addChild(targetBlastSprite2);
        conteinerTargetBlast.addChild(targetBlastSprite3);
        conteinerTargetBlast.addChild(targetBlastSprite4);
        conteinerTargetBlast.alpha = 0;
    }
    if (num === 2) {
        conteinerTargetBlastAk47 = new PIXI.Container();
        Conteiner.addChild(conteinerTargetBlastAk47);

        let targetBlastTexture1 = PIXI.Texture.from(imgLayer5);
        let targetBlastTexture2 = PIXI.Texture.from(imgLayer7);
        let targetBlastTexture3 = PIXI.Texture.from(imgLayer8);
        let targetBlastTexture4 = PIXI.Texture.from(imgLayer9);

        targetBlastSprite1Ak47 = new PIXI.Sprite(targetBlastTexture1);
        targetBlastSprite2Ak47 = new PIXI.Sprite(targetBlastTexture2);
        targetBlastSprite3Ak47 = new PIXI.Sprite(targetBlastTexture3);
        targetBlastSprite4Ak47 = new PIXI.Sprite(targetBlastTexture4);

        targetBlastSprite1Ak47.scale.x = targetBlastSprite1Ak47.scale.y = 0.5;
        targetBlastSprite2Ak47.scale.x = targetBlastSprite2Ak47.scale.y = 0.5;
        targetBlastSprite3Ak47.scale.x = targetBlastSprite3Ak47.scale.y = 0.5;
        targetBlastSprite4Ak47.scale.x = targetBlastSprite4Ak47.scale.y = 0.5;
        // targetBlastSprite.alpha = 1;
        targetBlastSprite2Ak47.x = 10;
        targetBlastSprite2Ak47.y = -5;

        targetBlastSprite3Ak47.x = 20;
        targetBlastSprite3Ak47.y = 22;

        targetBlastSprite4Ak47.x = 3;
        targetBlastSprite4Ak47.y = 33;

        conteinerTargetBlastAk47.x = WIDTH - WIDTH / 5.5;
        conteinerTargetBlastAk47.y = conteinerAk47.y - conteinerAk47.pivot.y - 15;
        if (positionDispl() === 0) {
            conteinerTargetBlastAk47.x = WIDTH - WIDTH / 4;
            conteinerTargetBlastAk47.y = conteinerAk47.y - conteinerAk47.pivot.y + 10;
        }
        conteinerTargetBlastAk47.addChild(targetBlastSprite1Ak47);
        conteinerTargetBlastAk47.addChild(targetBlastSprite2Ak47);
        conteinerTargetBlastAk47.addChild(targetBlastSprite3Ak47);
        conteinerTargetBlastAk47.addChild(targetBlastSprite4Ak47);
        conteinerTargetBlastAk47.alpha = 0;
    }
}

let graphicsCirles;
let conteinerTweenFireModBalls;

function tooltipCircles() {
    conteinerCircle = new PIXI.Container();
    Conteiner.addChild(conteinerCircle);
    graphicsCirles = new PIXI.Graphics();
    conteinerCircle.addChild(graphicsCirles);

    conteinerCircle2 = new PIXI.Container();
    Conteiner.addChild(conteinerCircle2);
    graphicsCirles2 = new PIXI.Graphics();
    conteinerCircle2.addChild(graphicsCirles2);

    conteinerCircleAk47 = new PIXI.Container();
    Conteiner.addChild(conteinerCircleAk47);
    graphicsCirlesAk47 = new PIXI.Graphics();
    conteinerCircleAk47.addChild(graphicsCirlesAk47);

    conteinerTweenFireModBalls = new PIXI.Container();
    Conteiner.addChild(conteinerTweenFireModBalls)
}

let contButtonInstall;

function ButtonInstall() {
    contButtonInstall = new PIXI.Container();
    Conteiner.addChild(contButtonInstall);

    let otstup = 3;
    let graphics = new PIXI.Graphics();
    let w = WIDTH / 3.1;
    let h = (HEIGHT / 2) / 10;

    contButtonInstall.x = WIDTH - w - otstup;
    contButtonInstall.y = otstup;

    graphics.beginFill(0xfd00fc, 1);
    graphics.drawRoundedRect(0, 0, w, h, 10);

    graphics.endFill();
    contButtonInstall.addChild(graphics);

    graphics.interactive = true;
    graphics.on("mousedown", () => {
        console.log('LiNK to DOWNLOAD');
        document.location.href = "https://apps.apple.com/fr/app/gun-idle/id1421079164";

    });
    graphics.on("touchend", () => {
        console.log('LiNK to DOWNLOAD');
        document.location.href = "https://apps.apple.com/fr/app/gun-idle/id1421079164";
    });

    let style = new PIXI.TextStyle();
    // style.fontSize = 26;
    style.fill = "0xfbfbfb";

    let text = new PIXI.Text("INSTALL", style);
    text.x = graphics.x;
    text.y = graphics.y;
    text.width = graphics.width;
    text.height = graphics.height - otstup;
    contButtonInstall.addChild(text);
}

let contwindowDownload;
let contwindowDownload2;
let graphicsLinck;

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

let spriteShotgun;

function WindowDownload() {

    contwindowDownload = new PIXI.Container();
    Conteiner.addChild(contwindowDownload);

    let fireModBggraphics = new PIXI.Graphics();
    fireModBggraphics.beginFill(0x000000, 0.5);
    fireModBggraphics.drawRect(0, 0, WIDTH, HEIGHT);
    fireModBggraphics.endFill();

    contwindowDownload.addChild(fireModBggraphics);

    contwindowDownload2 = new PIXI.Container();
    Conteiner.addChild(contwindowDownload2);

    let graphics = new PIXI.Graphics();
    let w = WIDTH - (WIDTH / 10) * 2;
    let h = HEIGHT / 2.12;
    let x = WIDTH / 10;
    let y = HEIGHT / 5;
    graphics.beginFill(0x4d4d4d, 1);
    graphics.drawRoundedRect(x, y, w, h, 26);
    graphics.endFill();
    contwindowDownload2.addChild(graphics);


    let style = new PIXI.TextStyle();
    style.fontSize = 22;
    style.fill = "0xfbfbfb";

    let text = new PIXI.Text("Congratulations", style);
    contwindowDownload2.addChild(text);
    text.x = WIDTH / 2 - text.width / 2
    text.y = y + HEIGHT / 30;

    let textureShotGun = PIXI.Texture.from(imgPumpShotgun);
    spriteShotgun = new PIXI.Sprite(textureShotGun);
    spriteShotgun.scale.x = spriteShotgun.scale.y = 0.3;
    spriteShotgun.x = WIDTH / 2 - text.width / 2;
    spriteShotgun.y = text.y + HEIGHT / 10;
    contwindowDownload2.addChild(spriteShotgun);


    graphicsLinck = new PIXI.Graphics();
    let w2 = WIDTH - (WIDTH / 4.4) * 2;
    let h2 = HEIGHT / 11.5;
    let x2 = WIDTH / 4.4;
    let y2 = HEIGHT / 2.1;
    graphicsLinck.beginFill(0xfd00fc, 1);
    graphicsLinck.drawRoundedRect(x2, y2, w2, h2, 16);
    graphicsLinck.endFill();
    contwindowDownload2.addChild(graphicsLinck);
    // graphicsLinck.interactive = true;
    graphicsLinck.on("mousedown", () => {
        console.log('LiNK to DOWNLOAD');
        document.location.href = "https://apps.apple.com/fr/app/gun-idle/id1421079164";

    });
    graphicsLinck.on("touchend", () => {
        console.log('LiNK to DOWNLOAD');
        document.location.href = "https://apps.apple.com/fr/app/gun-idle/id1421079164";
    });

    let style2 = new PIXI.TextStyle();
    style2.fontSize = 40;
    style2.fill = "0xfbfbfb";
    let text2 = new PIXI.Text("INSTALL", style2);
    text2.x = WIDTH / 2 - text2.width / 2;
    text2.y = y2;
    text2.height = h2;
    contwindowDownload2.addChild(text2);

    let style3 = new PIXI.TextStyle();
    style3.fontSize = 16;
    style3.fill = "0xfbfbfb";
    let text3 = new PIXI.Text("To keep using your bonus", style3);
    text3.x = WIDTH / 2 - text3.width / 2;
    text3.y = y2 + text2.height + HEIGHT / 26.6;
    contwindowDownload2.addChild(text3);

    if (positionDispl() === 0) {
        graphics.clear()
        w = WIDTH - (WIDTH / 3.3) * 2
        h = HEIGHT / 1.41;
        x = WIDTH / 2 - w / 2;
        y = HEIGHT / 2 - h / 2;
        graphics.beginFill(0x4d4d4d, 1);
        graphics.drawRoundedRect(x, y, w, h, 26);
        graphics.endFill();

        text.style.fontSize = 18;
        text.x = WIDTH / 2 - text.width / 2;


        graphicsLinck.clear();
        w2 = text.width;
        h2 = WIDTH / 11.5
        x2 = text.x;
        y2 = spriteShotgun.y + text.y / 1.5;
        graphicsLinck.beginFill(0xfd00fc, 1);
        graphicsLinck.drawRoundedRect(x2, y2, w2, h2, 16);
        graphicsLinck.endFill();

        style2.fontSize = 30;
        text2.x = WIDTH / 2 - text2.width / 2;
        text2.y = y2;
        text2.height = h2;

        // text2.y = HEIGHT / 2 - HEIGHT / 4 + 80;
        text3.y = y2 + text2.height + HEIGHT / 20;
    }

    contwindowDownload.alpha = 0;
    contwindowDownload2.alpha = 0;
    positionGun2 = conteinerAk47.x;


}

function TapToPlay() {
    contTapToPlay = new PIXI.Container();
    Conteiner.addChild(contTapToPlay);

    graphicsTapToPlay = new PIXI.Graphics();

    graphicsTapToPlay.clear();
    graphicsTapToPlay.beginFill(0x000000, 0.8);

    graphicsTapToPlay.moveTo(0, 0);
    graphicsTapToPlay.lineTo(0, HEIGHT);
    graphicsTapToPlay.lineTo(conteinerColt1911.x - conteinerColt1911.width / 2, HEIGHT);
    graphicsTapToPlay.lineTo(conteinerColt1911.x - conteinerColt1911.width / 2, conteinerColt1911.y - conteinerColt1911.height - 25);
    graphicsTapToPlay.lineTo(conteinerColt1911.x + conteinerColt1911.width, conteinerColt1911.y - conteinerColt1911.height - 25);
    graphicsTapToPlay.lineTo(conteinerColt1911.x + conteinerColt1911.width, conteinerColt1911.y + conteinerColt1911.height);
    graphicsTapToPlay.lineTo(conteinerColt1911.x - conteinerColt1911.width / 2, conteinerColt1911.y + conteinerColt1911.height);
    graphicsTapToPlay.lineTo(conteinerColt1911.x - conteinerColt1911.width / 2, HEIGHT);
    graphicsTapToPlay.lineTo(WIDTH, HEIGHT);
    graphicsTapToPlay.lineTo(WIDTH, 0);
    graphicsTapToPlay.lineTo(0, 0);
    graphicsTapToPlay.endFill();


    if (positionDispl() === 0) {
        graphicsTapToPlay.clear();
        graphicsTapToPlay.beginFill(0x000000, 0.8);
        graphicsTapToPlay.moveTo(0, 0);
        graphicsTapToPlay.lineTo(0, HEIGHT);
        graphicsTapToPlay.lineTo(conteinerColt1911.x - conteinerColt1911.width / 2, HEIGHT);
        graphicsTapToPlay.lineTo(conteinerColt1911.x - conteinerColt1911.width / 2, conteinerColt1911.y - conteinerColt1911.height - 25);
        graphicsTapToPlay.lineTo(conteinerColt1911.x + conteinerColt1911.width, conteinerColt1911.y - conteinerColt1911.height - 25);
        graphicsTapToPlay.lineTo(conteinerColt1911.x + conteinerColt1911.width, HEIGHT);
        graphicsTapToPlay.lineTo(WIDTH, HEIGHT);
        graphicsTapToPlay.lineTo(WIDTH, 0);
        graphicsTapToPlay.lineTo(0, 0);
        graphicsTapToPlay.endFill();
    }

    let style = new PIXI.TextStyle();
    style.fontSize = 60;
    style.fontWeight = 700;
    style.fill = "0xfbfbfb";

    textTapToPlay = new PIXI.Text("TAP TO \n PLAY!", style);
    textTapToPlay.x = WIDTH / 2 - textTapToPlay.width / 2;
    textTapToPlay.y = HEIGHT - height_block * 2;
    if (positionDispl() === 0) {
        textTapToPlay.y = HEIGHT - height_block * 2.5;
    }

    graphicsTapToPlay.interactive = true;

    graphicsTapToPlay.on("mousedown", () => {
        isAnimHelp = true;
        graphicsTapToPlay.clear();
        textTapToPlay.text = '';

    });
    graphicsTapToPlay.on("touchend", () => {
        isAnimHelp = true;
        graphicsTapToPlay.clear();
        textTapToPlay.text = '';
    });

    contTapToPlay.addChild(graphicsTapToPlay);
    contTapToPlay.addChild(textTapToPlay)
}

let radiusCircle = 10;
let isCirclesAnim = true;
let radiusCircle2 = 10;
let isCirclesAnim2 = false;
let radiusCircleAk47 = 10;
let isCirclesAnimAk47 = true;

function animHelper(num, conteiner, graph, cont) {
    let speedAnimHelper = 250;
    if (num === 1) isAnimHelp = false;
    if (num === 2) isAnimHelp2 = false;
    if (num === 3) isAnimHelpAk47 = false;

    var tween = PIXI.tweenManager.createTween(conteiner);
    tween.easing = PIXI.tween.Easing.linear();
    tween.time = speedAnimHelper;
    tween.on('end', () => {

        var tween = PIXI.tweenManager.createTween(conteiner);
        tween.easing = PIXI.tween.Easing.linear();
        tween.time = speedAnimHelper;
        tween.on('end', () => {

            // graphicsCirles.clear();
            graph.alpha = 1;
            graph.lineStyle(0);
            graph.beginFill(0x999999, 1);
            // graph.drawCircle(cont.x + 20, cont.y - 30, radiusCircle);
            if (num === 1) graph.drawCircle(cont.x + 20, cont.y - 30, radiusCircle);
            if (num === 2) graph.drawCircle(cont.x - 7, cont.y - 7, radiusCircle);
            if (num === 3) graph.drawCircle(cont.x + 20, cont.y - 30, radiusCircle);
            graph.endFill();

            let tweenCircle = PIXI.tweenManager.createTween(graph);
            tweenCircle.easing = PIXI.tween.Easing.linear();
            tweenCircle.time = 250;

            tweenCircle.to({
                alpha: 0,

            }).start();
            tweenCircle.on('update', () => {

                radiusCircle -= 0.1;
                graph.clear();
                graph.lineStyle(0);
                graph.beginFill(0x999999);
                if (num === 1) graph.drawCircle(cont.x + 20, cont.y - 30, radiusCircle);
                if (num === 2) graph.drawCircle(cont.x - 7, cont.y - 7, radiusCircle);
                if (num === 3) graph.drawCircle(cont.x + 20, cont.y - 30, radiusCircle);
                graph.endFill();
            })
            tweenCircle.on('end', () => {
                graph.clear();
                radiusCircle = 10;

            })
            setTimeout(() => {
                if (num === 1) isAnimHelp = true;
                if (num === 2) isAnimHelp2 = true;
                if (num === 3) isAnimHelpAk47 = true;
            }, 500);
        });
        tween.to({
            x: (conteiner.x - 10),
            y: (conteiner.y + 10)
        }).start();
    });
    tween.to({
        x: (conteiner.x + 10),
        y: (conteiner.y - 10),

    }).start();
}

function bulletHole(num) {
    if (num === 1) {
        conteinerbulletHole = new PIXI.Container();
        conteinerHole.addChild(conteinerbulletHole);

        let bulletHoleTexture = PIXI.Texture.from(imgBulletHole);

        let bulletHoleSprite = new PIXI.Sprite(bulletHoleTexture);

        bulletHoleSprite.scale.x = bulletHoleSprite.scale.y = 0.3;
        bulletHoleSprite.alpha = 1;

        conteinerbulletHole.x = Math.random() * (25 - 5) + 5;
        conteinerbulletHole.y = Math.random() * (50 - 0) + 0;
        conteinerbulletHole.addChild(bulletHoleSprite);
    }
    if (num === 2) {
        conteinerbulletHoleAk47 = new PIXI.Container();
        conteinerHoleAk47.addChild(conteinerbulletHoleAk47);

        let bulletHoleTexture = PIXI.Texture.from(imgBulletHole);

        let bulletHoleSprite = new PIXI.Sprite(bulletHoleTexture);

        bulletHoleSprite.scale.x = bulletHoleSprite.scale.y = 0.3;
        bulletHoleSprite.alpha = 1;

        conteinerbulletHoleAk47.x = Math.random() * (25 - 5) + 5;
        conteinerbulletHoleAk47.y = Math.random() * (50 - 0) + 0;

        conteinerbulletHoleAk47.addChild(bulletHoleSprite);
    }
};

// --- create Text Target --- //
function centerBasicText() {
    let n = MONEY;

    if (n >= 1000) {
        n = n / 1000;
        basicText.text = "$" + n + 'K';
    } else {
        basicText.text = "$" + n;
    }
}

function createTextTarget(coin, x, y, rotation, num) {

    MONEY += coin;
    centerBasicText();
    basicText.x = WIDTH / 2 - basicText.width / 2;

    let style = new PIXI.TextStyle();
    style.fontSize = 10;
    style.fill = "0xffffff";

    let textTarget = new PIXI.Text("+$" + coin, style);
    textTarget.x = x;
    textTarget.y = y;
    textTarget.rotation = rotation;
    if (num === 1) conteinerTextCoinColt.addChild(textTarget);
    if (num === 2) containerTextCoinAk47.addChild(textTarget);
};

function openNewLevel() {
    isAnimLvlTwo = true;
    conteinerImgLvl.children[0].alpha = 1;
    conteinerImgLvl.children[3].alpha = 1;

    conteinerImgLvl.children[2].text = MONEY + '$'
    isAnimHelp2 = true;
    isCirclesAnim2 = true;
};

// --- firemod --- //

let r = 255;
let g = 150;
let b = 0;
let isFireMod = false;

function fireMod() {
    isActiveFireMod = false;
    let fireModTimeOut = setTimeout(() => {
        isActiveFireMod = true;
    }, 50)
    if (Conteiner.x <= -10 || Conteiner.y <= -10) {
        Conteiner.x = 0;
        Conteiner.y = 0;
    }
    timeAutoShot = 200;

    // anim bg
    let timeBg = 100;
    let maxPos = 2.5;
    let minPos = -maxPos;
    let tweenBg = PIXI.tweenManager.createTween(Conteiner);
    tweenBg.easing = PIXI.tween.Easing.linear();
    tweenBg.time = timeBg;
    tweenBg.on('end', () => {
        let tweenBgBack = PIXI.tweenManager.createTween(Conteiner);
        tweenBgBack.easing = PIXI.tween.Easing.linear();
        tweenBgBack.time = timeBg;
        tweenBgBack.to({
            x: ((Math.floor(Math.random() * (maxPos - (minPos)) + (minPos)))),
            y: ((Math.floor(Math.random() * (maxPos - (minPos)) + (minPos))))
        }).start();
    });
    tweenBg.to({
        x: ((Math.floor(Math.random() * (maxPos - (minPos)) + (minPos)))),
        y: ((Math.floor(Math.random() * (maxPos - (minPos)) + (minPos))))
    }).start();

    // --- animation of fire balls --- //
    let x1, y1, x2, y2;

    if (positionDispl() === 0) x1 = WIDTH / 2 - WIDTH / 4 + conteinerColt1911.width / 2;
    else x1 = sptiteFire.x + 50;
    y1 = conteinerBullet.y;
    tweenFireModBalls(x1, y1);

    if (positionDispl() === 0) x2 = WIDTH / 2 - WIDTH / 4 + conteinerColt1911.width;
    else x2 = sptiteFire.x + 100;
    y2 = conteinerBulletAk47.y;
    tweenFireModBalls(x2, y2);
    // --- END animation of fire balls --- //

    // --- open loading window (5sec)--- ///
    let intervalStopeAllGame = setInterval(() => {
        isActiveFireMod = false;
        conteinerTweenFireModBalls.alpha = 0;

        Conteiner.x = Conteiner.y = 0
        contFireModBg.alpha = 0;

        contwindowDownload.alpha = 1;
        contwindowDownload2.alpha = 1;
        graphicsLinck.interactive = true;
        spriteShotgun.x = WIDTH / 2 - spriteShotgun.width / 2;
        contButtonInstall.alpha = 0;
        contButtonInstall.children[0].interactive = false;


        // Conteiner.removeChild(conteinerFire);
        stopAllAnim = true;
        clearInterval(intervalStopeAllGame);
        Conteiner.scale.x = 1;
        Conteiner.scale.y = 1;

    }, timeOpenLoadingWindow);
}

tweenFireModBalls = (x, y, y2) => {

    let graphicsCir = new PIXI.Graphics();
    let g = Math.floor(Math.random() * (150 - 0) + 0);
    let color = rgbToHex(r, g, b);
    graphicsCir.clear();
    graphicsCir.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphicsCir.beginFill(color, Math.random() * (0.9 - (0.7)) + (0.7));
    graphicsCir.drawCircle(0, 0, (Math.floor(Math.random() * (15 - (5)) + (5))));
    graphicsCir.endFill();
    conteinerTweenFireModBalls.addChild(graphicsCir)
    graphicsCir.alpha = 0;

    let timeCircle = 1000;

    var tweenBullet = PIXI.tweenManager.createTween(graphicsCir);
    tweenBullet.easing = PIXI.tween.Easing.linear();
    tweenBullet.time = timeCircle;
    tweenBullet.on('end', () => {
        var tweenBullet2 = PIXI.tweenManager.createTween(graphicsCir);
        tweenBullet2.easing = PIXI.tween.Easing.linear();
        tweenBullet2.time = timeCircle;
        tweenBullet2.on('end', () => {
            graphicsCir.clear()
        });
        tweenBullet2.on('update', () => {
            graphicsCir.alpha += -0.01;
        });
        tweenBullet2.to({
            x: WIDTH,
        }).start();
    });
    tweenBullet.on('update', () => {
        graphicsCir.alpha = 1;
        graphicsCir.scale.x += 0.01;
        graphicsCir.scale.y += 0.01;
    });
    tweenBullet.from({
        x: x,
        y: y,
    }).to({
        x: conteinerTargetColt_1.x,
        y: (y + (Math.floor(Math.random() * (height_block / 4 - (-height_block / 4)) + (-height_block / 4))))
    }).start();
}

let count = 0;
let countAk47 = 0;
let countAk47AnimHole = 0;

function tweenConteinerTargets(num, conteinerTarget, contTarget, time) {
    var tweenConteinerTarget = PIXI.tweenManager.createTween(conteinerTarget);
    conteinerTarget.alpha = 1;
    tweenConteinerTarget.easing = PIXI.tween.Easing.linear();
    tweenConteinerTarget.time = time;
    tweenConteinerTarget.on('end', () => {
        conteinerTarget.x = 0;
        contTarget.alpha = 1;
    });
    tweenConteinerTarget.to({
        x: -48,

    }).start();
}

function addMoneyTarget(coin) {
    MONEY += coin;
    basicText.text = "$" + MONEY;
    this.centerBasicText();
    basicText.x = WIDTH / 2 - basicText.width / 2;
}

function targetBlast(containerTextCoin, conteinerHole, conteinerTarget,
    conteinerTargetBlast, targetBlastSprite1, targetBlastSprite2,
    targetBlastSprite3, targetBlastSprite4, time) {

    containerTextCoin.children.length = 0;
    conteinerHole.children.length = 0;
    conteinerTarget.alpha = 0;
    conteinerTargetBlast.alpha = 1;

    targetBlastSprite1.scale.x = targetBlastSprite1.scale.y =
        targetBlastSprite2.scale.x = targetBlastSprite2.scale.y =
        targetBlastSprite3.scale.x = targetBlastSprite3.scale.y =
        targetBlastSprite4.scale.x = targetBlastSprite4.scale.y = 0.6;

    // tween BlastSprite
    var tweenTarget = PIXI.tweenManager.createTween(targetBlastSprite1);
    targetBlastSprite1.alpha = 1;
    tweenTarget.easing = PIXI.tween.Easing.linear();
    tweenTarget.time = time;
    tweenTarget.on('end', () => {
        targetBlastSprite1.alpha = 0;
        targetBlastSprite1.x = 0;
        targetBlastSprite1.y = 0;
    });
    tweenTarget.to({
        x: -20,
        y: -10,
        alpha: (targetBlastSprite1.alpha -= 0.5)
    }).start();

    var tweenTarget2 = PIXI.tweenManager.createTween(targetBlastSprite2);
    targetBlastSprite2.alpha = 1;
    tweenTarget2.easing = PIXI.tween.Easing.linear();
    tweenTarget2.time = time;
    tweenTarget2.on('end', () => {
        targetBlastSprite2.alpha = 0;
        targetBlastSprite2.x = 10;
        targetBlastSprite2.y = -5;
    });
    tweenTarget2.to({
        x: (targetBlastSprite2.x + 25),
        y: (targetBlastSprite2.y - 10),
        alpha: (targetBlastSprite2.alpha -= 0.5)
    }).start();

    var tweenTarget3 = PIXI.tweenManager.createTween(targetBlastSprite3);
    targetBlastSprite3.alpha = 1;
    tweenTarget3.easing = PIXI.tween.Easing.linear();
    tweenTarget3.time = time;
    tweenTarget3.on('end', () => {
        targetBlastSprite3.alpha = 0;
        targetBlastSprite3.x = 20;
        targetBlastSprite3.y = 22;
    });
    tweenTarget3.to({
        x: (targetBlastSprite3.x + 20),
        y: (targetBlastSprite3.y + 10),
        alpha: (targetBlastSprite3.alpha -= 0.5)
    }).start();

    var tweenTarget4 = PIXI.tweenManager.createTween(targetBlastSprite4);
    targetBlastSprite4.alpha = 1;
    tweenTarget4.easing = PIXI.tween.Easing.linear();
    tweenTarget4.time = time;
    tweenTarget4.on('end', () => {
        targetBlastSprite4.alpha = 0;
        targetBlastSprite4.x = 3;
        targetBlastSprite4.y = 33;
    });
    tweenTarget4.to({
        x: (targetBlastSprite4.x - 20),
        y: (targetBlastSprite4.y + 10),
        alpha: (targetBlastSprite4.alpha -= 0.5)
    }).start();
}

function tweenGun(numberBlock, conteiner, timeColt, posX) {
    var tween = PIXI.tweenManager.createTween(conteiner);
    tween.easing = PIXI.tween.Easing.linear();
    tween.time = timeColt;
    tween.on('end', () => {
        var tween = PIXI.tweenManager.createTween(conteiner);
        tween.easing = PIXI.tween.Easing.linear();
        tween.time = timeColt;
        if (numberBlock === 1) {
            tween.from({
                rotation: -0.4
            }).to({
                rotation: 0.2
            }).start();
            tween.on('end', () => {
                var tween = PIXI.tweenManager.createTween(conteiner);
                tween.easing = PIXI.tween.Easing.linear();
                tween.time = timeColt;
                tween.to({
                    rotation: 0
                }).start();
            });
        }
        if (numberBlock === 2) {
            var tween = PIXI.tweenManager.createTween(conteiner);
            tween.easing = PIXI.tween.Easing.linear();
            tween.time = timeColt;
            tween.from({
                x: posX - 10
            }).to({
                rotation: 0.05,
                x: posX + 10
            }).start();
            tween.on('end', () => {
                var tween = PIXI.tweenManager.createTween(conteiner);
                tween.easing = PIXI.tween.Easing.linear();
                tween.time = timeColt;
                tween.to({
                    rotation: 0,
                    x: posX
                }).start();
            });
        }

    });
    if (numberBlock === 1) {
        tween.from({
            x: posX,
            rotation: 0
        }).to({
            x: posX,
            rotation: -0.4
        }).start();
    }
    if (numberBlock === 2) {
        tween.from({
            x: positionGun2
        }).to({
            x: positionGun2 - 10,
            rotation: -0.1
        }).start();
    }
}

function tweenFire(numberBlock, sptitFire, timeFireColt) {
    var tween = PIXI.tweenManager.createTween(sptitFire);
    sptitFire.alpha = 1;
    tween.easing = PIXI.tween.Easing.linear();
    tween.time = timeFireColt;
    tween.to({
        alpha: 0,
    }).start();

    if (numberBlock === 1) {
        isAnimColt1911 = false;
        intervalAnimColt = setTimeout(() => {
            isAnimColt1911 = true;
        }, timeAutoShot)
    }
    if (numberBlock === 2) {
        isAnimAk47 = false;
        intervalAnimAk = setTimeout(() => {
            isAnimAk47 = true;
        }, timeAutoShot)
    }
}

function tweenShutter(numberBlock, timeColt, xSecondSpriteColt) {
    if (numberBlock === 1) {
        var tween = PIXI.tweenManager.createTween(secondSpriteColt);
        tween.easing = PIXI.tween.Easing.linear();
        tween.time = timeColt;
        tween.on('end', () => {
            var tween = PIXI.tweenManager.createTween(secondSpriteColt);
            tween.easing = PIXI.tween.Easing.linear();
            tween.time = timeColt;
            tween.from({
                x: -xSecondSpriteColt
            }).to({
                x: 0
            }).start();
        });
        tween.to({
            x: -xSecondSpriteColt,
        }).start();
    }
}

function tweenBullet(numberBlock, conteiner, bulletTextura, 
    conteinerBulets, contTarget, timeAnimBullet, 
    timeAnimDellTarget) {
    var sprite = new PIXI.Sprite(bulletTextura);
    sprite.scale.x = sprite.scale.y = 0.1;
    sprite.position.set(conteinerBulets.x, conteinerBulets.y);
    Conteiner.addChild(sprite);
    sprite.x = WIDTH / 2 - WIDTH / 4 + conteiner.width / 2;

    var tweenBullet = PIXI.tweenManager.createTween(sprite);
    tweenBullet.easing = PIXI.tween.Easing.linear();
    tweenBullet.time = timeAnimBullet;
    sprite.alpha = 1;
    tweenBullet.on('end', () => {
        sprite.alpha = 0;
        window.navigator.vibrate(300);
        var tweenTarget = PIXI.tweenManager.createTween(contTarget);
        tweenTarget.easing = PIXI.tween.Easing.linear();
        tweenTarget.time = 100;

        let x = contTarget.x = WIDTH - WIDTH / 5.5;
        if (positionDispl() === 0) {
            x = contTarget.x = WIDTH - WIDTH / 4;
        }
        tweenTarget.on('end', () => {
            contTarget.x = x;
        });
        tweenTarget.to({
            x: x + 5
        }).start();
        if (numberBlock === 1) {
            if (count > 3) {
                count = 0;

                targetBlast(conteinerTextCoinColt, conteinerHole, conteinerTargetColt_1,
                    conteinerTargetBlast, targetBlastSprite1, targetBlastSprite2,
                    targetBlastSprite3, targetBlastSprite4, timeAnimDellTarget);

                // движение контейнера на заднем фоне
                tweenConteinerTargets(1, conteinerTarget, conteinerTargetColt_1, timeAnimDellTarget / 2);
                if (isActiveFireMod) addMoneyTarget(40)
                else addMoneyTarget(20)


            } else {
                window.navigator.vibrate(300);
                count++;
                bulletHole(1);
                if (isActiveFireMod) {
                    this.createTextTarget(
                        40,
                        Math.random() * ((conteinerTargetColt_1.x - 20) - (conteinerTargetColt_1.x - 60)) + (conteinerTargetColt_1.x - 60),
                        Math.random() * ((conteinerTargetColt_1.y) - (conteinerTargetColt_1.y + 20)) + (conteinerTargetColt_1.y + 20),
                        Math.random() * (0.6 - -0.6) + -0.6,
                        1
                    );
                } else {
                    this.createTextTarget(
                        20,
                        Math.random() * ((conteinerTargetColt_1.x - 20) - (conteinerTargetColt_1.x - 60)) + (conteinerTargetColt_1.x - 60),
                        Math.random() * ((conteinerTargetColt_1.y + 20) - (conteinerTargetColt_1.y + 60)) + (conteinerTargetColt_1.y + 60),
                        Math.random() * (0.6 - -0.6) + -0.6,
                        1
                    );
                }
            }
        }
        if (numberBlock === 2) {
            // anim all target
            if (countAk47 > 3) {
                countAk47 = 0;
                targetBlast(containerTextCoinAk47, conteinerHoleAk47, conteinerTargetAk47_1,
                    conteinerTargetBlastAk47, targetBlastSprite1Ak47, targetBlastSprite2Ak47,
                    targetBlastSprite3Ak47, targetBlastSprite4Ak47, timeAnimDellTarget);

                if (numberBlock === 2) {
                    tweenConteinerTargets(2, conteinerTargetAk47, conteinerTargetAk47_1, timeAnimDellTarget / 2)
                    if (isActiveFireMod) addMoneyTarget(80)
                    else addMoneyTarget(40)
                }
            }
            else {
                window.navigator.vibrate(300);

                countAk47AnimHole++;
                if (countAk47AnimHole === 3) {
                    targetSpriteAk47.texture = target;
                    // scale
                    Conteiner.scale.x += 0.05;
                    Conteiner.scale.y += 0.05;
                    Conteiner.x -= 10;
                    Conteiner.y -= 10;
                    isActiveFireMod = true;
                    contFireModBg.alpha = 1;
                }
                if (countAk47AnimHole > 3) {
                    countAk47++;
                    bulletHole(2);
                }
                if (isActiveFireMod) {
                    this.createTextTarget(
                        80,
                        Math.random() * ((conteinerTargetAk47_1.x - 20) - (conteinerTargetAk47_1.x - 60)) + (conteinerTargetAk47_1.x - 60),
                        Math.random() * ((conteinerTargetAk47_1.y) - (conteinerTargetAk47_1.y + 20)) + (conteinerTargetAk47_1.y + 20),
                        Math.random() * (0.6 - -0.6) + -0.6,
                        2
                    );
                } else {

                    this.createTextTarget(
                        40,
                        Math.random() * ((conteinerTargetAk47_1.x - 20) - (conteinerTargetAk47_1.x - 60)) + (conteinerTargetAk47_1.x - 60),
                        Math.random() * ((conteinerTargetAk47_1.y + 20) - (conteinerTargetAk47_1.y + 60)) + (conteinerTargetAk47_1.y + 60),
                        Math.random() * (0.6 - -0.6) + -0.6,
                        2
                    );
                }

            }
            // end anim all target
        }

    });
    tweenBullet.from({
        x: WIDTH / 2 - WIDTH / 4 + conteiner.width / 2,
    }).to({
        x: conteinerTargetColt_1.x,
    }).start();
}

function tweenWholeBlock(numberBlock, sptitFire, conteiner, posX,
    bulletTextura, conteinerBulets, contTarget) {
    const timeAnimBullet = 250;

    let timeAnimDellTarget = timeAnimBullet;
    let counAnimColt = 3;
    let timeFireColt = timeAnimBullet / 2;
    let timeColt = timeAnimBullet / counAnimColt;
    let xSecondSpriteColt = 14;

    // anim bullet
    tweenBullet(numberBlock, conteiner, bulletTextura, 
        conteinerBulets, contTarget, timeAnimBullet, 
        timeAnimDellTarget)

    tweenGun(numberBlock, conteiner, timeColt, posX);

    if (numberBlock === 1) tweenShutter(numberBlock, timeColt, xSecondSpriteColt)

    tweenFire(numberBlock, sptitFire, timeFireColt)
}

function animGame() {
    PIXI.tweenManager.update();
    if (isAnimHelp) animHelper(1, conteinerHelper, graphicsCirles, conteinerColt1911);

    if (isAnimHelp2) animHelper(2, conteinerImgLvl.children[3], graphicsCirles2, conteinerImgLvl.children[3]);

    if (isVisibleAk47) {
        if (isAnimHelpAk47) animHelper(3, conteinerHelperAk47, graphicsCirlesAk47, conteinerAk47);

    }
    if (!stopAllAnim) {
        if (isAnimAk47) tweenWholeBlock(2, sptiteFireGun2, conteinerAk47, positionGun2,
            bulletTextureGun2, conteinerBulletAk47, conteinerTargetAk47_1);
        autoAnimCountAk47 = 0;
    }

    if (isActiveFireMod) if (!isFireMod) this.fireMod(2)

    if (!stopAllAnim) {
        if (isAnimColt1911) {
            tweenWholeBlock(1, sptiteFire, conteinerColt1911, conteinerColt1911.x,
                bulletTextureGun2, conteinerBullet, conteinerTargetColt_1);
            autoAnimCount = 0;
        }
    }

    if (MONEY >= 100 && !isAnimLvlTwo) {
        conteinerImgLvl.children[0].interactive = true;
        this.openNewLevel();
    }
}

function deviceHorizontally() {
    if (positionDispl() === 0) {

        // gun 1 position gorizont
        conteinerColt1911.x = WIDTH / 2 - WIDTH / 4;
        conteinerColt1911.y = HEIGHT - height_block / 2 + height_block / 2.5;

        textColt1911.x = WIDTH / 2 - WIDTH / 4 - textColt1911.width;
        textColt1911.y = HEIGHT - height_block;
        helperSprite.scale.x = helperSprite.scale.y = 0.3;

        conteinerTargetColt_1.x = conteinerTarget2.x = WIDTH - WIDTH / 4;
        conteinerTargetColt_1.y = conteinerTarget2.y = conteinerColt1911.y - conteinerColt1911.pivot.y - 15;

        conteinerBullet.x = WIDTH / 2 - WIDTH / 4;
        conteinerBullet.y = conteinerColt1911.y - conteinerColt1911.pivot.y;

        // gun 2 position gorizont
        conteinerAk47.x = WIDTH / 2 - WIDTH / 4;
        conteinerAk47.y = HEIGHT - height_block - height_block / 2 + height_block / 3;

        textAk12.x = WIDTH / 2 - WIDTH / 4 - textColt1911.width;
        textAk12.y = HEIGHT - height_block * 2;

        helperSpriteAk47.scale.x = helperSpriteAk47.scale.y = 0.3;


        conteinerTargetAk47_1.x = conteinerTargetAk472.x = WIDTH - WIDTH / 4;
        conteinerTargetAk47_1.y = conteinerTargetAk472.y = conteinerAk47.y - conteinerAk47.pivot.y - 10;

        helperLvlSprite.scale.x = helperLvlSprite.scale.y = 0.3;

        conteinerBulletAk47.y = conteinerAk47.y - conteinerAk47.height - 5;

        // update header bar

        headerGraphics.children[0].clear()
        headerGraphics.children[0].beginFill(COLOR_HEADER);
        headerGraphics.children[0].moveTo(0, 0);
        headerGraphics.children[0].lineTo(0, 0 + HEIGHT / 10 - HEIGHT / 30);
        headerGraphics.children[0].lineTo(0 + WIDTH / 2.45, 0 + HEIGHT / 10 - HEIGHT / 30);
        headerGraphics.children[0].lineTo(0 + WIDTH / 2.3, 0 + HEIGHT / 10);
        headerGraphics.children[0].lineTo(WIDTH - WIDTH / 2.3, 0 + HEIGHT / 10);
        headerGraphics.children[0].lineTo(WIDTH - WIDTH / 2.45, 0 + HEIGHT / 10 - HEIGHT / 30);
        headerGraphics.children[0].lineTo(WIDTH, 0 + HEIGHT / 10 - HEIGHT / 30);
        headerGraphics.children[0].lineTo(WIDTH, 0);
        headerGraphics.children[0].endFill();


        contButtonInstall.x = WIDTH - (WIDTH / 10) - 3;
        contButtonInstall.y = 3;

        contButtonInstall.children[0].clear()
        contButtonInstall.children[0].beginFill(0xfd00fc, 1);
        contButtonInstall.children[0].drawRoundedRect(0, 0, WIDTH / 2 - WIDTH / 2.5, (HEIGHT / 2) / 10, 10);
        contButtonInstall.children[0].endFill();

        contButtonInstall.children[1].width = WIDTH / 2 - WIDTH / 2.5

        headerGraphics.children[1].style.fontSize = 22;
        headerGraphics.children[1].x = WIDTH / 2 - basicText.width / 2;
        headerGraphics.children[1].y = (HEIGHT / 2) / 8 - basicText.height / 2;

        positionGun2 = conteinerAk47.x;
    }
}


let firstTextureColt;
let secondTextureColt;
let firstSpriteColt;
let secondSpriteColt;
let firstTextureFire;
let sptiteFire;
let firstTextureGun2;
let secondTextureGun2;
let firstSpriteGun2;
let secondSpriteGun2;
let TextureFireGun2;
let sptiteFireGun2;

function loadTexture() {
    if (LEVEL_2_GUN === 1) {
        firstTextureGun2 = PIXI.Texture.from(imgAk47);
        secondTextureGun2 = PIXI.Texture.from(imgAk47Knife);
        firstSpriteGun2 = new PIXI.Sprite(firstTextureGun2);
        secondSpriteGun2 = new PIXI.Sprite(secondTextureGun2);
        TextureFireGun2 = PIXI.Texture.from(imgFireAk47);
        sptiteFireGun2 = new PIXI.Sprite(TextureFireGun2);
    }
    if (LEVEL_2_GUN === 2) {
        firstTextureGun2 = PIXI.Texture.from(imgMachinGun);
        secondTextureGun2 = null
        firstSpriteGun2 = new PIXI.Sprite(firstTextureGun2);
        secondSpriteGun2 = null;
        TextureFireGun2 = PIXI.Texture.from(imgMachinGunFire);
        sptiteFireGun2 = new PIXI.Sprite(TextureFireGun2);
    }
    if (LEVEL_2_GUN === 3) {
        firstTextureGun2 = PIXI.Texture.from(imgL94);
        secondTextureGun2 = null
        firstSpriteGun2 = new PIXI.Sprite(firstTextureGun2);
        secondSpriteGun2 = null;
        TextureFireGun2 = PIXI.Texture.from(imgL94Fire);
        sptiteFireGun2 = new PIXI.Sprite(TextureFireGun2);
    }

    firstTextureColt = PIXI.Texture.from(imgPistol);
    secondTextureColt = PIXI.Texture.from(imgPistolGroup);
    firstSpriteColt = new PIXI.Sprite(firstTextureColt);
    secondSpriteColt = new PIXI.Sprite(secondTextureColt);
    firstTextureFire = PIXI.Texture.from(imgPistolFire);
    sptiteFire = new PIXI.Sprite(firstTextureFire);
}

const Canvas = function () {

    this.createCanvas = () => {
        this.app = new PIXI.Application({
            width: WIDTH,
            height: HEIGHT,
        });
        document.body.appendChild(this.app.view);

        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);
        Conteiner = this.container;
    };

    this.init = () => {
        this.createCanvas();
        loadTexture();

        new CreateBg(COLOR_BG_BLOCK1, COLOR_BG_BLOCK2);
        new CreateFireModBg();
        new TextLvl("Level 2", WIDTH / 2, HEIGHT - height_block - height_block / 2);
        new TextLvl("Level 3", WIDTH / 2, HEIGHT - height_block * 2 - height_block / 2);
        new TextLvl("Level 4", WIDTH / 2, HEIGHT - height_block * 3 - height_block / 2 + HEIGHT / 50);
        new CreateHeader();

        new CreateGun(
            firstSpriteColt,
            secondSpriteColt,
            sptiteFire,
            1, 0, 25, HEIGHT, 0, -50, 1
        );
        new CreateGun(
            firstSpriteGun2,
            secondSpriteGun2,
            sptiteFireGun2,
            1, 0, 25, HEIGHT, 0, 26, 2
        );

        new CreateTarget(1);
        new CreateTarget(2);
        new Helper(1);
        new Helper(2);
        new Bullet(1);
        new Bullet(2);

        new TargetBlast(1);
        new TargetBlast(2);

        conteinerTextCoinColt = new PIXI.Container();
        this.container.addChild(conteinerTextCoinColt);
        containerTextCoinAk47 = new PIXI.Container();
        this.container.addChild(containerTextCoinAk47);
        tooltipCircles();

        new ButtonInstall();
        new WindowDownload();
        deviceHorizontally();
        new TapToPlay();
        // this.anim();
    };

    this.init();

    this.app.ticker.add(() => {
        animGame();
    });
};

let canvas = new Canvas();



