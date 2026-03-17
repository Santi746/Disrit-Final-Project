"use client";

import DashboardTemplate from "@/app/components/templates/DashboardTemplate";
import { FEATURED_CLUBS } from "@/app/data/clubs/ClubsDasboard";
import { CLUB_SECTION_TITLE } from "@/app/data/clubs/ClubSectionTitle";
export default function Explore() {

  return (
    <DashboardTemplate
      featuredClubs={FEATURED_CLUBS}
      categories={CLUB_SECTION_TITLE}
    />
  );
}
