import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: ${({ theme }) => theme.card};
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 800px;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    border: 0.1px solid #854CE6;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: ${({ theme }) => theme.text_primary};
    &:hover {
        color: #854CE6;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 20px;
`;

const CompanyLogo = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 10px;
    object-fit: contain;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
`;

const Subtitle = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.text_secondary};
    margin-top: 5px;
`;

const Description = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 20px;
    line-height: 1.6;
`;

const AchievementList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const AchievementItem = styled.li`
    font-size: 14px;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 10px;
    padding-left: 20px;
    position: relative;
    line-height: 1.5;

    &:before {
        content: "•";
        color: #854CE6;
        position: absolute;
        left: 0;
    }
`;

const ExperienceDetails = ({ experience, onClose }) => {
    return (
        <Modal onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>×</CloseButton>
                <Header>
                    <CompanyLogo src={experience.img} alt={experience.company} />
                    <div>
                        <Title>{experience.role}</Title>
                        <Subtitle>{experience.company} | {experience.date}</Subtitle>
                    </div>
                </Header>
                <Description>{experience.desc}</Description>
                <AchievementList>
                    {experience.achievements.map((achievement, index) => (
                        <AchievementItem key={index}>{achievement}</AchievementItem>
                    ))}
                </AchievementList>
            </ModalContent>
        </Modal>
    );
};

export default ExperienceDetails; 