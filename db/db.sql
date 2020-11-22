-- User Table
CREATE TABLE "user"
(
    user_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    username character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    pswd character varying(255) COLLATE pg_catalog."default" NOT NULL,
    joined date NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT user_pkey PRIMARY KEY (user_id),
    CONSTRAINT user_email_key UNIQUE (email),
    CONSTRAINT user_username_key UNIQUE (username)
);


-- Group Table
CREATE TABLE "group"
(
    group_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    grp_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    created date NOT NULL DEFAULT CURRENT_DATE,
    budget boolean,
    budget_amt money,
    created_by uuid,
    CONSTRAINT group_pkey PRIMARY KEY (group_id),
    CONSTRAINT group_created_by_fkey FOREIGN KEY (created_by)
        REFERENCES "user" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Task Table
CREATE TABLE "task"
(
    task_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    type character varying(10) COLLATE pg_catalog."default" NOT NULL,
    title character varying(100) COLLATE pg_catalog."default" NOT NULL,
    remark character varying(100) COLLATE pg_catalog."default",
    amount numeric(10,2) NOT NULL,
    user_id uuid,
    group_id uuid,
    task_date timestamp with time zone NOT NULL,
    username character varying(100) COLLATE pg_catalog."default" NOT NULL,
    created timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_change boolean NOT NULL DEFAULT false,
    CONSTRAINT task_pkey PRIMARY KEY (task_id),
    CONSTRAINT task_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES "group" (group_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT task_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES "user" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- User Groups table
CREATE TABLE public.user_groups
(
    user_id uuid,
    group_id uuid,
    CONSTRAINT user_groups_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES public."group" (group_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_groups_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public."user" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
