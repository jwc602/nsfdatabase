--drop function public.addiepub(argid text, argname text, argdoi text);
CREATE OR REPLACE function public.addierawafill(argafillname text, argarrids text[])
  returns text --<< this defines the structure of the result 
  LANGUAGE plpgsql
AS 
$BODY$
declare
retgid varchar;
BEGIN
	--RAISE INFO '% _ % _ %', argid, argname, argdoi;
	IF EXISTS(SELECT 1 FROM rawafill where rawafillname = argafillname) THEN 
		update rawafill set _rawafillid = argarrids  where rawafillname = argafillname ;
	ELSE 
		insert into rawafill(rawafillname,_rawafillid) values(argafillname,argarrids);	
	END IF;
	select rawafill.rid into retgid from public.rawafill where rawafillname = argafillname;
	return retgid;
END 
$BODY$;

--select * from addiegrant('https://openalex.org/F4320322252', 'Israel Science Foundation', '302/21')