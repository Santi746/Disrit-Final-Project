import ClubTemplate from "@/app/components/templates/ClubTemplate";

export default function ClubLayout({ children }) {
    return (
        <ClubTemplate>
            {children}
        </ClubTemplate>
    );
}