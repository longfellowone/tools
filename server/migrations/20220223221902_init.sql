create extension if not exists "uuid-ossp";

create table employee
(
    id       uuid primary key default uuid_generate_v1mc(),
    employee text not null
);

insert into employee (id, employee)
values ('00000000-0000-0000-0000-000000000001', 'Not Assigned');

insert into employee (employee)
values ('Ahmed Abdullah'),
       ('Allan Galsim'),
       ('Aman Dhaliwal'),
       ('Andrew Zagar'),
       ('Arlen Hodge'),
       ('Carl Ortiz'),
       ('Conner Ward-Cox'),
       ('Derick Chilufya'),
       ('Elias Phelan'),
       ('George Paille'),
       ('Jes Smith'),
       ('Justin Padula'),
       ('Lance Kahl'),
       ('Sal Reyes'),
       ('Thane Staley'),
       ('Trevor Mise');

create table tool
(
    id          uuid primary key default uuid_generate_v1mc(),
    employee_id uuid not null references employee (id),
    tagged      text not null,
    brand       text not null,
    tool        text not null
);

insert into tool (employee_id, tagged, brand, tool)
values ('00000000-0000-0000-0000-000000000001', 'BS#009', 'Milwaukee', 'Band Saw'),
       ('00000000-0000-0000-0000-000000000001', 'CS#007', 'Milwaukee', 'Chop Saw'),
       ('00000000-0000-0000-0000-000000000001', 'HV#506', 'Milwaukee', 'SDS Vac'),
       ('00000000-0000-0000-0000-000000000001', 'FT#001', 'Klein', 'Fish Tape'),
       ('00000000-0000-0000-0000-000000000001', 'TCV#001', 'Rigid', 'Tri Vice'),
       ('00000000-0000-0000-0000-000000000001', 'CD#004', 'Milwaukee', 'Fuel Drill'),
       ('00000000-0000-0000-0000-000000000001', 'FG6#100', 'Louisville', 'Ladder 6'),
       ('00000000-0000-0000-0000-000000000001', 'FG6#600', 'Allright', 'Ladder 6'),
       ('00000000-0000-0000-0000-000000000001', 'FT#014', 'Milwaukee', 'Fish Tape'),
       ('00000000-0000-0000-0000-000000000001', 'FG6#039', 'Featherlite', 'Ladder 6'),
       ('00000000-0000-0000-0000-000000000001', 'FG6#103', 'Featherlite', 'Ladder 6'),
       ('00000000-0000-0000-0000-000000000001', 'FG6#047', 'Featherlite', 'Ladder 6'),
       ('00000000-0000-0000-0000-000000000001', 'FG6#126', 'Werner', 'Ladder 6'),
       ('00000000-0000-0000-0000-000000000001', 'FG6#103', 'Werner', 'Ladder 6'),
       ('00000000-0000-0000-0000-000000000001', 'FG6#096', 'Allright', 'Ladder 6'),
       ('00000000-0000-0000-0000-000000000001', 'FG6#601', 'Allright', 'Ladder 6'),
       ('00000000-0000-0000-0000-000000000001', 'FG8#700', 'Allright', 'Ladder 8'),
       ('00000000-0000-0000-0000-000000000001', 'FG8#701', 'Allright', 'Ladder 8'),
       ('00000000-0000-0000-0000-000000000001', 'FG8#038', 'Werner', 'Ladder 8'),
       ('00000000-0000-0000-0000-000000000001', 'SZ#025', 'Milwaukee', 'Sawzall'),
       ('00000000-0000-0000-0000-000000000001', 'SV#001', 'Rigid', 'Shop Vac'),
       ('00000000-0000-0000-0000-000000000001', 'CL#013', 'Milwaukee', 'Shop Vac'),
       ('00000000-0000-0000-0000-000000000001', 'HD#004', 'Hilti', 'SDS Drill'),
       ('00000000-0000-0000-0000-000000000001', 'LL#003', 'Hilti', 'Laser'),
       ('00000000-0000-0000-0000-000000000001', 'HDV#004', 'Hilti', 'SDS Vac'),
       ('00000000-0000-0000-0000-000000000001', 'HDV#005', 'Hilti', 'SDS Vac'),
       ('00000000-0000-0000-0000-000000000001', 'HDV#006', 'Hilti', 'SDS Vac'),
       ('00000000-0000-0000-0000-000000000001', 'HD#005', 'Hilti', 'SDS Drill'),
       ('00000000-0000-0000-0000-000000000001', 'HD#006', 'Hilti', 'SDS Drill'),
       ('00000000-0000-0000-0000-000000000001', 'B#100', 'Hilti', 'Battery'),
       ('00000000-0000-0000-0000-000000000001', 'B#101', 'Hilti', 'Battery'),
       ('00000000-0000-0000-0000-000000000001', 'B#200', 'Hilti', 'Battery'),
       ('00000000-0000-0000-0000-000000000001', 'B#201', 'Hilti', 'Battery'),
       ('00000000-0000-0000-0000-000000000001', 'B#300', 'Hilti', 'Battery'),
       ('00000000-0000-0000-0000-000000000001', 'B#301', 'Hilti', 'Battery'),
       ('00000000-0000-0000-0000-000000000001', 'BC#100', 'Hilti', 'Charger'),
       ('00000000-0000-0000-0000-000000000001', 'BC#200', 'Hilti', 'Charger'),
       ('00000000-0000-0000-0000-000000000001', 'BC#300', 'Hilti', 'Charger');