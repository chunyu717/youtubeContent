--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review (
    id integer NOT NULL,
    reviewcount bigint,
    "timestamp" date
);


ALTER TABLE public.review OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    username text NOT NULL,
    password text NOT NULL,
    realname text,
    gender boolean,
    mobile text,
    address text,
    "createdAt" date,
    type bigint,
    "isActive" boolean
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review (id, reviewcount, "timestamp") FROM stdin;
1	247	2017-03-14
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (username, password, realname, gender, mobile, address, "createdAt", type, "isActive") FROM stdin;
admin	chttl232	撘萄頂摰?t	0975383225	獢???唬葉?梯楝685撌?5撘?1??2019-05-29	1	t
bbbccd4	ggininder	chang	f	0988026495	?唬葉?梯楝	2019-06-03	\N	t
a	a	a	t	a	a	2019-06-19	0	t
g	g	g	t	g	g	2019-06-19	0	f
gg	g	g	t	g	g	2019-06-19	0	t
aaaaa	bbbb	eeee	t	eee	?唬葉?梯楝685撌?5撘?1??2019-06-19	0	f
aaa	ccc	ddd	t	eee	fff	2019-11-30	0	f
11111	11111	111	t	111	1111	2019-11-30	0	f
22222	11111	111	t	111	1111	2019-11-30	0	f
444	444	444	t	444	444	2019-11-30	0	t
55555	55555	55555	t	5555	5555	2019-11-30	0	t
\.


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (username);


--
-- PostgreSQL database dump complete
--

