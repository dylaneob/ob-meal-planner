# Build app/_render-<slug>.html: index.html + ONE client merged into the saved-client list (never replacing it) +
# an auto-export script. Usage: python3 mkrender.py "<client key>" <record.json> <slug>
import sys, json
client, rec_path, slug = sys.argv[1], sys.argv[2], sys.argv[3]
app='/Users/dylanobrien/ob-meal-planner/app/'
idx=open(app+'index.html').read(); rec=json.load(open(rec_path))
inj=('(function(){var K="ob_meal_clients_v1",c={};try{c=JSON.parse(localStorage.getItem(K)||"{}")||{};}catch(e){}'
     'c[%s]=%s;localStorage.setItem(K,JSON.stringify(c));if(!localStorage.getItem("ob_coach"))localStorage.setItem("ob_coach","OB");})();'
     % (json.dumps(client), json.dumps(rec, ensure_ascii=False)))
auto='''<script>
window.addEventListener("load",function(){window.print=function(){};
setTimeout(function(){var sel=document.getElementById("clientSelect");
for(var i=0;i<sel.options.length;i++)if(sel.options[i].value===%s){sel.selectedIndex=i;break;}
sel.dispatchEvent(new Event("change"));
setTimeout(function(){var d=document.getElementById("dialogOk");if(d&&d.offsetParent!==null)d.click();
setTimeout(function(){document.getElementById("exportBtn").click();
setTimeout(function(){var d2=document.getElementById("dialogOk");if(d2&&d2.offsetParent!==null)d2.click();},300);},400);},400);},300);});
</script>
''' % json.dumps(client)
i=idx.index('<script src="data/foods.js'); idx=idx[:i]+'<script>'+inj+'</script>\n'+idx[i:]
j=idx.rindex('</body>'); idx=idx[:j]+auto+idx[j:]
open(app+'_render-%s.html' % slug,'w').write(idx); print('ok', len(idx))
