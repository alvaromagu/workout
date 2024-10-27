ALTER TABLE IF EXISTS public.routine_exercise
    ADD COLUMN type character varying(20) NOT NULL DEFAULT 'steps-reps';

ALTER TABLE IF EXISTS public.routine_exercise
    ADD COLUMN target_time time without time zone;
ALTER TABLE IF EXISTS public.routine_exercise
    ADD CONSTRAINT type_check CHECK (type = 'steps-reps' OR type = 'time')
    NOT VALID;

ALTER TABLE IF EXISTS public.routine_exercise
    ADD CONSTRAINT target_check CHECK ((type = 'steps-reps' AND target_steps IS NOT null) OR (type = 'time' AND target_time IS NOT null))
    NOT VALID;