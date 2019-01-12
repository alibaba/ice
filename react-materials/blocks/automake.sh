#! /bin/sh

files=`ls -d *`;

# IGNORE_DIR="demo AbilityIntroduction AblityItems About AccountBadge AccountFeatures AccountPanel AccountStatus AddressInfo ApplicationProgress AreaStackChart ArticleList AssetInfoDisplay AuthorityTable Banner BarLineChart BasicDetailInfo BasicException BasicNotFound BasicTab BlackFooter BoardList BraftEditor";
WHITELIST="AbilityIntroduction AblityItems About AccountBadge AccountFeatures AccountPanel AccountStatus AddressInfo ApplicationProgress AreaStackChart ArticleList AssetInfoDisplay AuthorityTable Banner BarLineChart BasicDetailInfo BasicException BasicNotFound BasicTab BlackFooter BoardList BraftEditor";
START_WITH="PictureTextList";
IS_START="TRUE";

for x in $files
do
if [[ "$IS_START" =~ "FALSE" ]]; then
    if [[ "$START_WITH" =~ "$x" ]]; then
        IS_START="TRUE";
    fi;
    echo "ignore $x";
    continue;
else
    echo --------------------------- $x;
case "$1" in
    "install" )
    cd $x;tnpm install;cd ..;
    ;;

    "build" )
    cd $x; npm run build; cd ..;
    ;;

    "publish" )
    cd $x;npm publish;cd ..;
    ;;

    "0.x-1.x" )
    cd $x; tnpm i; next-migrate src -m; idev build; idev screenshot; cd ..;
    ;;

    "migrate" )
    cd $x; next-migrate src -m; cd ..;
    ;;

    "updatepkg" )
    cd $x;node ../../../../updatepkg.js;cd ..;
    ;;
esac
fi
done
