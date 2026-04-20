--drop function public.addiepub(argid text, argname text, argdoi text);
CREATE OR REPLACE function public.addiepub(argid text, argname text, argdoi text)
  returns text --<< this defines the structure of the result 
  LANGUAGE plpgsql
AS 
$BODY$

BEGIN
	RAISE INFO '% _ % _ %', argid, argname, argdoi;
	IF EXISTS(SELECT 1 FROM publications WHERE openalexid= argid) THEN 
		update publications set name = argname, doi = argdoi where openalexid = argid;
	ELSE 
		IF EXISTS(SELECT 1 FROM publications WHERE doi= argdoi) THEN 
			update publications set name = argname, openalexid = argid where doi = argdoi;
		else
			insert into publications(openalexid,name,doi) values(argid, argname,argdoi);
		end if;	
	END IF;
	return argid;
END 
$BODY$;

--select * from addiepub($1, $2, $3)