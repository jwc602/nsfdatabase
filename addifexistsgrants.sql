--drop function public.addiepub(argid text, argname text, argdoi text);
CREATE OR REPLACE function public.addiegrant(argfundid text, argfundname text,argawardid text)
  returns text --<< this defines the structure of the result 
  LANGUAGE plpgsql
AS 
$BODY$
declare
retgid varchar;
BEGIN
	--RAISE INFO '% _ % _ %', argid, argname, argdoi;
	IF EXISTS(SELECT 1 FROM grants WHERE awardid = argawardid) THEN 
		update grants set fundername = argfundname, funderid = argfundid  where awardid = argawardid ;
	ELSE 
		insert into grants(funderid,fundername,awardid) values(argfundid, argfundname,argawardid);	
	END IF;
	select grants.gid into retgid from public.grants where awardid=argawardid;
	return retgid;
END 
$BODY$;

select * from addiegrant('https://openalex.org/F4320322252', 'Israel Science Foundation', '302/21')