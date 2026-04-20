
--drop function public.addieent(argid text, argname text, argdoi text);
CREATE OR REPLACE function public.addieent(argid text, argname text, argdoi text)
  returns text --<< this defines the structure of the result 
  LANGUAGE plpgsql
AS 
$BODY$

BEGIN
	RAISE INFO '% _ % _ %', argid, argname, argdoi;
	IF EXISTS(SELECT 1 FROM entities WHERE openalexid= argid) THEN 
		update entities set name = argname, rorid = argdoi where openalexid = argid;
	ELSE 
		IF EXISTS(SELECT 1 FROM entities WHERE rorid= argdoi) THEN 
			update entities set name = argname, openalexid = argid where rorid = argdoi;
		else
			insert into entities(openalexid,name,rorid) values(argid, argname,argdoi);
		end if;	
	END IF;
	return argid;
END 
$BODY$;

--select * from addieent('https://openalex.org/I124227911','Ben-Gurion University of the Negev' , 'https://ror.org/05tkyf982')