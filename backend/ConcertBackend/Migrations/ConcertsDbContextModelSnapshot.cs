﻿// <auto-generated />
using System;
using ConcertBackend.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ConcertBackend.Migrations
{
    [DbContext(typeof(ConcertsDbContext))]
    partial class ConcertsDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ConcertBackend.Models.Booking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ConcertId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("PurchaseAmount")
                        .HasColumnType("real");

                    b.Property<int>("TicketQuantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ConcertId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("ConcertBackend.Models.Concert", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ConcertDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConcertType")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<int?>("CoordinatesId")
                        .HasColumnType("int");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Performer")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.Property<int>("TicketsCount")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CoordinatesId");

                    b.ToTable("Concerts");

                    b.UseTptMappingStrategy();
                });

            modelBuilder.Entity("ConcertBackend.Models.Coordinates", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<float>("Latitude")
                        .HasColumnType("real");

                    b.Property<float>("Longitude")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.ToTable("Coordinates");
                });

            modelBuilder.Entity("ConcertBackend.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ConcertId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("PurchaseAmount")
                        .HasColumnType("real");

                    b.Property<int>("TicketQuantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ConcertId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("ConcertBackend.Models.Promocode", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Total")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.ToTable("Promocodes");
                });

            modelBuilder.Entity("ConcertBackend.Models.Classic", b =>
                {
                    b.HasBaseType("ConcertBackend.Models.Concert");

                    b.Property<string>("Composer")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.Property<string>("ConcertName")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.Property<string>("VoiceType")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.ToTable("Classics");
                });

            modelBuilder.Entity("ConcertBackend.Models.OpenAir", b =>
                {
                    b.HasBaseType("ConcertBackend.Models.Concert");

                    b.Property<string>("Headliner")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.Property<string>("Journey")
                        .IsRequired()
                        .HasMaxLength(125)
                        .HasColumnType("nvarchar(125)");

                    b.ToTable("OpenAirs");
                });

            modelBuilder.Entity("ConcertBackend.Models.Party", b =>
                {
                    b.HasBaseType("ConcertBackend.Models.Concert");

                    b.Property<int>("AgeLimit")
                        .HasColumnType("int");

                    b.ToTable("Parties");
                });

            modelBuilder.Entity("ConcertBackend.Models.Booking", b =>
                {
                    b.HasOne("ConcertBackend.Models.Concert", null)
                        .WithMany("Bookings")
                        .HasForeignKey("ConcertId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ConcertBackend.Models.Concert", b =>
                {
                    b.HasOne("ConcertBackend.Models.Coordinates", "Coordinates")
                        .WithMany()
                        .HasForeignKey("CoordinatesId");

                    b.Navigation("Coordinates");
                });

            modelBuilder.Entity("ConcertBackend.Models.Order", b =>
                {
                    b.HasOne("ConcertBackend.Models.Concert", null)
                        .WithMany("Orders")
                        .HasForeignKey("ConcertId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ConcertBackend.Models.Classic", b =>
                {
                    b.HasOne("ConcertBackend.Models.Concert", null)
                        .WithOne()
                        .HasForeignKey("ConcertBackend.Models.Classic", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ConcertBackend.Models.OpenAir", b =>
                {
                    b.HasOne("ConcertBackend.Models.Concert", null)
                        .WithOne()
                        .HasForeignKey("ConcertBackend.Models.OpenAir", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ConcertBackend.Models.Party", b =>
                {
                    b.HasOne("ConcertBackend.Models.Concert", null)
                        .WithOne()
                        .HasForeignKey("ConcertBackend.Models.Party", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ConcertBackend.Models.Concert", b =>
                {
                    b.Navigation("Bookings");

                    b.Navigation("Orders");
                });
#pragma warning restore 612, 618
        }
    }
}
