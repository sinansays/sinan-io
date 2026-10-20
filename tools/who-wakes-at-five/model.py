import csv, math, json, sys
import pathlib
HERE=pathlib.Path(__file__).resolve().parent
R=str(HERE/'data')+'/'
rows=list(csv.DictReader(open(R+'fischer2017_us_msfwe_by_age.csv')))
mean={}
for r in rows:
    a=r['age']; a=80 if a.startswith('80') else int(a)
    mean[a]=float(r['msfwe_total_h'])
# US adult population weights by age band (Census 2024 approx; [assumption])
bands=[(18,24,.118),(25,34,.173),(35,44,.166),(45,54,.152),(55,64,.159),(65,74,.130),(75,80,.102)]
def w_ages():
    out=[]
    for lo,hi,w in bands:
        ages=[a for a in range(lo,hi+1) if a in mean]
        for a in ages: out.append((a,w/len(ages)))
    return out
W=w_ages()
Phi=lambda z:0.5*(1+math.erf(z/math.sqrt(2)))
def cdf_natural_wake(t,sd=1.45,half=4.0,ages=None):
    ws=ages or W; tot=sum(w for a,w in ws)
    return sum(w*Phi((t-half-mean[a])/sd) for a,w in ws)/tot
times=[4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10]
res={'times':times,'base':[round(100*cdf_natural_wake(t),1) for t in times],
     'lo':[round(100*min(cdf_natural_wake(t,1.2,4.0),cdf_natural_wake(t,1.8,4.25)),1) for t in times],
     'hi':[round(100*max(cdf_natural_wake(t,1.8,3.75),cdf_natural_wake(t,1.2,3.75)),1) for t in times]}
# by age band: share whose natural wake <=5:30 and <=7:00
byage=[]
for lo,hi,w in bands:
    ages=[(a,1) for a in range(lo,hi+1) if a in mean]
    byage.append({'band':f'{lo}-{hi}' if hi<80 else '75+','le530':round(100*cdf_natural_wake(5.5,ages=ages),1),
      'le530_lo':round(100*cdf_natural_wake(5.5,1.2,4.25,ages=ages),1),'le530_hi':round(100*cdf_natural_wake(5.5,1.8,3.75,ages=ages),1),
      'le700':round(100*cdf_natural_wake(7,ages=ages),1)})
res['byage']=byage
# MCTQ (Europe-heavy) natural wake from MSFsc histogram + 4h
h=list(csv.DictReader(open(R+'mctq_2017_msf_msfsc_hist_digitized.csv')))
def hh(s):
    x,y=s.split(':'); v=int(x)+int(y)/60; return v-24 if v>20 else v
bins=[(hh(r['bin_center']),float(r['MSFsc_pct'])) for r in h]
tot=sum(p for _,p in bins)
def mctq_cdf(t,half=4.0):
    s=0
    for c,p in bins:
        lo,hi=c-.25,c+.25; x=t-half
        if x>=hi: s+=p
        elif x>lo: s+=p*(x-lo)/.5
    return 100*s/tot
res['mctq']=[round(mctq_cdf(t),1) for t in times]
json.dump(res,open(HERE/'model.json','w'),indent=1)
print('wrote', HERE/'model.json')
